/**
 * BAVARIA MOTOR HOUSE <-> AUTOLEAD SYSTEMS INTEGRATION ADAPTER
 *
 * Connects Bavaria Motor House showroom directly to AutoLead Systems CRM backend:
 * - /api/buyer/slots: Real-time time slot availability
 * - /api/buyer/lead: Create buyer lead
 * - /api/buyer/qualify: Lead qualification
 * - /api/buyer/appointment: Book test-drive appointment with 409 conflict prevention
 *
 * Supports both relative /api (via Vite proxy) and direct http://localhost:5173/api
 */

import { BAVARIA_VEHICLES } from '../data/bavariaVehicles';

const BAVARIA_LEADS_STORAGE_KEY = 'bavaria_showroom_leads_v1';
const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const customBackend = urlParams?.get('backend');
const AUTOLEAD_BACKEND_ORIGIN = customBackend || 'http://localhost:5173';

export const BAVARIA_TIME_SLOTS = [
  '09:00 - 10:30',
  '10:30 - 12:00',
  '14:00 - 15:30',
  '16:00 - 17:30'
];

export function normalizeVietnamPhone(rawPhone = '') {
  const digits = String(rawPhone).replace(/\D/g, '');
  if (digits.startsWith('84') && digits.length === 11) {
    return '0' + digits.slice(2);
  }
  return digits;
}

export function isValidVietnamPhone(rawPhone = '') {
  const normalized = normalizeVietnamPhone(rawPhone);
  return /^(0[3|5|7|8|9])[0-9]{8}$/.test(normalized);
}

async function apiFetch(path, options = {}) {
  // First try relative path (works via Vite proxy on port 5174)
  try {
    const res = await fetch(path, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const err = new Error(data?.message || `HTTP error ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } catch (err) {
    if (err.status === 409 || err.status === 400 || err.status === 401) {
      throw err;
    }
    // If relative path fails (e.g., outside dev server), try direct localhost:5173
    try {
      const directUrl = `${AUTOLEAD_BACKEND_ORIGIN}${path}`;
      const res2 = await fetch(directUrl, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options
      });
      const data2 = await res2.json().catch(() => null);
      if (!res2.ok) {
        const err2 = new Error(data2?.message || `HTTP error ${res2.status}`);
        err2.status = res2.status;
        err2.data = data2;
        throw err2;
      }
      return data2;
    } catch (directErr) {
      if (directErr.status === 409 || directErr.status === 400) {
        throw directErr;
      }
      return null;
    }
  }
}

/**
 * Retrieve slot availability for a date and BMW model
 */
export async function getBavariaSlotAvailability(date, vehicleModel) {
  if (!date || !vehicleModel) {
    return BAVARIA_TIME_SLOTS.map((time) => ({ time, isBooked: false }));
  }

  try {
    const res = await apiFetch(
      `/api/buyer/slots?date=${encodeURIComponent(date)}&vehicleModel=${encodeURIComponent(vehicleModel)}`
    );
    if (res && res.success && Array.isArray(res.slots)) {
      return res.slots.map((s) => ({
        time: s.slot || s.time,
        isBooked: s.isAvailable === false || Boolean(s.isBooked)
      }));
    }
  } catch {
    // Fallback if backend is offline
  }

  return BAVARIA_TIME_SLOTS.map((time) => ({
    time,
    isBooked: false
  }));
}

/**
 * Submit Bavaria Test-Drive Booking to AutoLead Backend
 */
export async function submitBavariaTestDriveBooking(payload) {
  const normalizedPhone = normalizeVietnamPhone(payload.phone);
  const createdAt = new Date().toISOString();

  const matchedVehicle =
    BAVARIA_VEHICLES.find(
      (v) =>
        v.name === payload.vehicle_model ||
        v.shortName === payload.vehicle_model ||
        v.id === payload.vehicle_model
    ) || BAVARIA_VEHICLES[0];

  const canonicalModelName = payload.vehicle_model || matchedVehicle.name;

  const contractRecord = {
    id: `BMH-${Date.now()}`,
    customer_name: (payload.customer_name || '').trim(),
    phone: normalizedPhone,
    email: (payload.email || '').trim(),
    vehicle_model: canonicalModelName,
    preferred_date: payload.preferred_date,
    preferred_time: payload.preferred_time,
    customer_notes: (payload.customer_notes || '').trim(),
    lead_source: payload.lead_source === 'ai_assistant' ? 'ai_assistant' : 'website_booking',
    conversation_summary:
      payload.conversation_summary ||
      (payload.lead_source === 'ai_assistant'
        ? `Khách hàng được tư vấn qua BMW CONCIERGE về mẫu ${canonicalModelName}.`
        : `Khách hàng đặt lịch lái thử trực tiếp trên website Bavaria Motor House cho mẫu ${canonicalModelName}.`),
    appointment_status: 'Pending Confirmation',
    created_at: createdAt
  };

  // 1. Local showroom storage log
  try {
    const existing = JSON.parse(localStorage.getItem(BAVARIA_LEADS_STORAGE_KEY) || '[]');
    existing.unshift(contractRecord);
    localStorage.setItem(BAVARIA_LEADS_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore storage quota
  }

  // 2. Synchronize to AutoLead Systems Backend
  let backendSynced = false;
  let backendLeadId = null;

  try {
    const leadRes = await apiFetch('/api/buyer/lead', {
      method: 'POST',
      body: JSON.stringify({
        customerName: contractRecord.customer_name,
        phone: contractRecord.phone,
        email: contractRecord.email || 'concierge@bavariamotors.vn',
        interestedVehicle: contractRecord.vehicle_model,
        vehicleSegment: matchedVehicle?.category || 'Luxury Sedan',
        source:
          contractRecord.lead_source === 'ai_assistant'
            ? 'Bavaria Motor House (BMW Concierge AI)'
            : 'Bavaria Motor House (Website Booking)'
      })
    });

    if (leadRes && leadRes.success && leadRes.data?.id) {
      backendLeadId = leadRes.data.id;

      await apiFetch('/api/buyer/qualify', {
        method: 'POST',
        body: JSON.stringify({
          leadId: backendLeadId,
          expectedBudget: matchedVehicle?.priceFormatted || 'Trên 3 Tỷ VNĐ',
          expectedPurchasingTime: 'Trong 1 tháng tới',
          paymentMethod: 'Tư vấn trực tiếp tại Bavaria Motor House',
          tradeInNeeded: 'Cần thẩm định thêm',
          purchasePurpose:
            contractRecord.lead_source === 'ai_assistant'
              ? `[BMW CONCIERGE AI] ${contractRecord.conversation_summary}`
              : `[Bavaria Website] ${contractRecord.customer_notes || 'Trải nghiệm lái thử xe BMW'}`
        })
      });

      await apiFetch('/api/buyer/appointment', {
        method: 'POST',
        body: JSON.stringify({
          leadId: backendLeadId,
          customerName: contractRecord.customer_name,
          phone: contractRecord.phone,
          email: contractRecord.email || 'concierge@bavariamotors.vn',
          vehicleModel: contractRecord.vehicle_model,
          appointmentDate: contractRecord.preferred_date,
          appointmentTime: contractRecord.preferred_time,
          showroomLocation: 'Bavaria Motor House — BMW Luxury Salon',
          notes: `[Nguồn: ${contractRecord.lead_source}] [Trạng thái: ${contractRecord.appointment_status}] ${contractRecord.customer_notes || ''} | ${contractRecord.conversation_summary}`
        })
      });

      backendSynced = true;
    }
  } catch (err) {
    if (err && err.status === 409) {
      const conflictError = new Error(
        err.message || 'Khung giờ lái thử này vừa có khách đặt trước. Quý khách vui lòng chọn khung giờ khác.'
      );
      conflictError.status = 409;
      throw conflictError;
    }
  }

  // 3. Also update localStorage CRM cache if accessed on same domain
  let crmItem = null;
  try {
    const existingCrm = JSON.parse(localStorage.getItem('autolead_crm_leads_v1') || '[]');
    crmItem = {
      id: backendLeadId || contractRecord.id,
      customerName: contractRecord.customer_name,
      phone: contractRecord.phone,
      email: contractRecord.email || 'Khách hàng Bavaria Motor House',
      interestedVehicle: contractRecord.vehicle_model,
      vehicleSegment: matchedVehicle?.category || 'BMW Luxury',
      source:
        contractRecord.lead_source === 'ai_assistant'
          ? 'Bavaria Motor House • BMW Concierge AI'
          : 'Bavaria Motor House • Website Booking',
      budget: matchedVehicle?.priceFormatted || 'Thương lượng',
      paymentMethod: 'Tư vấn tại Salon',
      timeline: `Lịch hẹn: ${contractRecord.preferred_date} (${contractRecord.preferred_time})`,
      status: 'Đã đặt lịch lái thử',
      score: contractRecord.lead_source === 'ai_assistant' ? 'Hot' : 'Warm',
      scoreValue: contractRecord.lead_source === 'ai_assistant' ? 95 : 88,
      assignedTo: 'Bavaria Concierge Desk',
      createdAt: 'Vừa xong',
      notes: [
        {
          id: `note-${Date.now()}`,
          text: `[BAVARIA MOTOR HOUSE] Lịch hẹn: ${contractRecord.preferred_date} (${contractRecord.preferred_time}). Ghi chú: ${contractRecord.customer_notes || 'Không có'}. Tóm tắt: ${contractRecord.conversation_summary}`,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          author: contractRecord.lead_source === 'ai_assistant' ? 'BMW CONCIERGE AI' : 'Bavaria Booking System'
        }
      ]
    };
    localStorage.setItem(
      'autolead_crm_leads_v1',
      JSON.stringify([crmItem, ...existingCrm.filter((x) => x.id !== crmItem.id)])
    );
  } catch {
    // Ignore
  }

  // 4. Dispatch Cross-Window Event (postMessage) & BroadcastChannel for real-time CRM updates
  try {
    const syncMessage = {
      type: 'AUTOLEAD_LEAD_SYNC',
      source: 'bavaria_showroom',
      timestamp: Date.now(),
      record: contractRecord,
      crmLead: crmItem
    };

    // Send to parent window if inside an iframe on AutoLead Systems
    if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
      window.parent.postMessage(syncMessage, '*');
    }
    // Send to opener window if opened via window.open from AutoLead Systems
    if (typeof window !== 'undefined' && window.opener && !window.opener.closed) {
      window.opener.postMessage(syncMessage, '*');
    }
    // Send via BroadcastChannel across all browser tabs
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('autolead_sync_channel');
      bc.postMessage(syncMessage);
      bc.close();
    }
  } catch (crossErr) {
    console.warn('Cross-window sync dispatch warning:', crossErr);
  }

  return {
    success: true,
    backendSynced,
    record: contractRecord
  };
}

export function getBavariaSubmittedLeads() {
  try {
    return JSON.parse(localStorage.getItem(BAVARIA_LEADS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
