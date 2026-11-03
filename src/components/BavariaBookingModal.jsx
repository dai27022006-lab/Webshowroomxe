import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Car,
  Phone,
  User,
  Mail,
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { BAVARIA_VEHICLES } from '../data/bavariaVehicles';
import {
  BAVARIA_TIME_SLOTS,
  getBavariaSlotAvailability,
  isValidVietnamPhone,
  submitBavariaTestDriveBooking
} from '../services/bavariaAutoLeadAdapter';

const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export default function BavariaBookingModal({
  isOpen,
  onClose,
  initialVehicleModel = '',
  leadSource = 'website_booking',
  conversationSummary = '',
  onSuccessBooking,
  onOpenCrm
}) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleModel, setVehicleModel] = useState(
    initialVehicleModel || BAVARIA_VEHICLES[0].name
  );
  const [preferredDate, setPreferredDate] = useState(getTomorrowDateString());
  const [preferredTime, setPreferredTime] = useState(BAVARIA_TIME_SLOTS[0]);
  const [customerNotes, setCustomerNotes] = useState('');

  const [slots, setSlots] = useState(
    BAVARIA_TIME_SLOTS.map((time) => ({ time, isBooked: false }))
  );
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSubmittedRecord(null);
      setErrors({});
      setApiError('');
      if (initialVehicleModel) {
        const matched = BAVARIA_VEHICLES.find(
          (v) =>
            v.name === initialVehicleModel ||
            v.shortName === initialVehicleModel ||
            v.id === initialVehicleModel
        );
        setVehicleModel(matched ? matched.name : initialVehicleModel);
      } else if (!vehicleModel) {
        setVehicleModel(BAVARIA_VEHICLES[0].name);
      }
      if (!preferredDate) {
        setPreferredDate(getTomorrowDateString());
      }
    }
  }, [isOpen, initialVehicleModel]);

  useEffect(() => {
    if (!isOpen || !preferredDate || !vehicleModel) return;
    let active = true;
    setLoadingSlots(true);
    getBavariaSlotAvailability(preferredDate, vehicleModel)
      .then((data) => {
        if (!active) return;
        setSlots(data);
        const currentSlotObj = data.find((s) => s.time === preferredTime);
        if (currentSlotObj?.isBooked) {
          const firstAvailable = data.find((s) => !s.isBooked);
          if (firstAvailable) {
            setPreferredTime(firstAvailable.time);
          }
        }
      })
      .finally(() => {
        if (active) setLoadingSlots(false);
      });
    return () => {
      active = false;
    };
  }, [isOpen, preferredDate, vehicleModel]);

  if (!isOpen) return null;

  const selectedVehicleObj =
    BAVARIA_VEHICLES.find(
      (v) => v.name === vehicleModel || v.shortName === vehicleModel
    ) || BAVARIA_VEHICLES[0];

  const validateForm = () => {
    const nextErrors = {};
    if (!customerName || customerName.trim().length < 2) {
      nextErrors.customerName = 'Vui lòng nhập họ và tên của Quý khách.';
    }
    if (!phone || !isValidVietnamPhone(phone)) {
      nextErrors.phone =
        'Vui lòng nhập số điện thoại di động Việt Nam hợp lệ (10 chữ số, ví dụ: 0901234567).';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Địa chỉ email không đúng định dạng.';
    }
    if (!vehicleModel) {
      nextErrors.vehicleModel = 'Vui lòng chọn dòng xe BMW Quý khách muốn lái thử.';
    }
    if (!preferredDate) {
      nextErrors.preferredDate = 'Vui lòng chọn ngày lái thử mong muốn.';
    }
    if (!preferredTime) {
      nextErrors.preferredTime = 'Vui lòng chọn khung giờ lái thử.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setApiError('');

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const result = await submitBavariaTestDriveBooking({
        customer_name: customerName,
        phone,
        email,
        vehicle_model: vehicleModel,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        customer_notes: customerNotes,
        lead_source: leadSource,
        conversation_summary: conversationSummary
      });

      setSubmittedRecord(result.record);
      if (onSuccessBooking) {
        onSuccessBooking(result.record);
      }
    } catch (err) {
      setApiError(
        err?.message ||
          'Không thể gửi yêu cầu vào lúc này. Vui lòng kiểm tra lại thông tin và thử lại.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{ backgroundColor: 'rgba(11, 13, 16, 0.86)', backdropFilter: 'blur(10px)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bavaria-booking-modal-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-xl border my-auto overflow-hidden shadow-2xl transition-all"
        style={{
          backgroundColor: '#15191F',
          borderColor: '#303740',
          color: '#F4F5F6'
        }}
      >
        {/* Top Accent Line */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, #0078D6 0%, #60A5FA 50%, #15191F 100%)'
          }}
        />

        {/* Modal Header */}
        <div
          className="flex items-start justify-between px-5 sm:px-8 py-5 border-b"
          style={{ borderColor: '#303740', backgroundColor: '#0B0D10' }}
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className="text-[11px] uppercase tracking-[0.22em] font-semibold px-2.5 py-0.5 rounded-full border"
                style={{
                  color: '#F4F5F6',
                  borderColor: '#0078D6',
                  backgroundColor: 'rgba(0, 120, 214, 0.2)'
                }}
              >
                PRIVATE TEST DRIVE REQUEST
              </span>
              {leadSource === 'ai_assistant' && (
                <span
                  className="inline-flex items-center gap-1 text-[11px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
                  style={{
                    color: '#93C5FD',
                    borderColor: 'rgba(0, 120, 214, 0.5)',
                    backgroundColor: 'rgba(0, 120, 214, 0.12)'
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  Đề xuất từ BMW Concierge
                </span>
              )}
            </div>
            <h2
              id="bavaria-booking-modal-title"
              className="text-xl sm:text-2xl font-normal tracking-wide text-[#F4F5F6]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Đặt Lịch Trải Nghiệm & Lái Thử BMW
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#929BA6] hover:text-[#F4F5F6] border border-transparent hover:border-[#303740] rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng biểu mẫu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 max-h-[82vh] overflow-y-auto">
          {submittedRecord ? (
            <div className="py-4 space-y-6">
              <div
                className="p-5 sm:p-6 rounded-xl border flex flex-col sm:flex-row items-start gap-4"
                style={{
                  backgroundColor: '#1C222A',
                  borderColor: '#0078D6'
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(0, 120, 214, 0.2)', color: '#60A5FA' }}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#929BA6] block">
                    TRẠNG THÁI: PENDING CONFIRMATION (CHỜ XÁC NHẬN)
                  </span>
                  <p className="text-base sm:text-lg font-medium text-[#F4F5F6] leading-relaxed">
                    Yêu cầu của bạn đã được gửi đến showroom. Nhân viên tư vấn sẽ liên hệ để xác nhận lịch lái thử.
                  </p>
                  <p className="text-xs text-[#929BA6]">
                    Hồ sơ đăng ký mã <span className="text-[#F4F5F6] font-mono">{submittedRecord.id}</span> đã được đồng bộ tự động về hệ thống quản trị khách hàng AutoLead Systems của showroom.
                  </p>
                </div>
              </div>

              {/* Summary Table */}
              <div
                className="rounded-xl border p-5 space-y-3 text-sm"
                style={{ backgroundColor: '#0B0D10', borderColor: '#303740' }}
              >
                <div className="text-xs uppercase tracking-[0.18em] text-[#929BA6] pb-2 border-b border-[#303740]">
                  THÔNG TIN YÊU CẦU LÁI THỬ
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-xs text-[#929BA6] block">Khách hàng</span>
                    <span className="text-[#F4F5F6] font-medium">{submittedRecord.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#929BA6] block">Số điện thoại</span>
                    <span className="text-[#F4F5F6] font-mono">{submittedRecord.phone}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs text-[#929BA6] block">Mẫu xe đăng ký trải nghiệm</span>
                    <span className="text-[#F4F5F6] font-medium">{submittedRecord.vehicle_model}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#929BA6] block">Ngày dự kiến</span>
                    <span className="text-[#F4F5F6]">{submittedRecord.preferred_date}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#929BA6] block">Khung giờ ưu tiên</span>
                    <span className="text-[#F4F5F6]">{submittedRecord.preferred_time}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#929BA6] block">Nguồn ghi nhận (Lead Source)</span>
                    <span className="text-[#93C5FD] font-mono text-xs">{submittedRecord.lead_source}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#929BA6] block">Trạng thái lịch hẹn</span>
                    <span className="text-amber-300 text-xs font-medium">
                      {submittedRecord.appointment_status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <a
                  href="http://localhost:5173/#crm"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-wider border border-[#303740] text-[#929BA6] hover:text-[#F4F5F6] hover:border-[#0078D6] transition-colors"
                >
                  <span>Mở AutoLead CRM Kiểm Tra Lead</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#0078D6] hover:bg-[#0062B0] transition-colors cursor-pointer sm:ml-auto"
                >
                  Hoàn Tất & Quay Lại Showroom
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {selectedVehicleObj && (
                <div
                  className="flex items-center gap-4 p-3.5 rounded-xl border"
                  style={{ backgroundColor: '#0B0D10', borderColor: '#303740' }}
                >
                  <img
                    src={selectedVehicleObj.images.main}
                    alt={selectedVehicleObj.name}
                    className="w-24 h-16 object-cover rounded-lg border border-[#303740] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] uppercase tracking-wider text-[#929BA6]">
                      {selectedVehicleObj.category} • {selectedVehicleObj.chassis}
                    </div>
                    <div className="text-sm sm:text-base font-medium text-[#F4F5F6] truncate">
                      {selectedVehicleObj.name}
                    </div>
                    <div className="text-xs text-[#929BA6] mt-0.5">
                      Giá tham khảo: <span className="text-[#F4F5F6] font-semibold">{selectedVehicleObj.priceFormatted}</span>
                    </div>
                  </div>
                </div>
              )}

              {leadSource === 'ai_assistant' && conversationSummary && (
                <div
                  className="p-3.5 rounded-xl border text-xs leading-relaxed"
                  style={{
                    backgroundColor: 'rgba(0, 120, 214, 0.08)',
                    borderColor: 'rgba(0, 120, 214, 0.4)',
                    color: '#D1D5DB'
                  }}
                >
                  <span className="uppercase tracking-wider text-[#93C5FD] font-semibold block mb-1">
                    Ghi chú từ BMW Concierge:
                  </span>
                  {conversationSummary}
                </div>
              )}

              {apiError && (
                <div
                  className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-red-950/30 border-red-500/50 text-red-200"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{apiError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929BA6] mb-1.5">
                    Họ và Tên Quý Khách <span className="text-[#0078D6]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#929BA6] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.customerName) setErrors({ ...errors, customerName: '' });
                      }}
                      placeholder="Ví dụ: Nguyễn Minh Quân"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#0078D6]"
                      style={{
                        backgroundColor: '#0B0D10',
                        borderColor: errors.customerName ? '#EF4444' : '#303740',
                        color: '#F4F5F6'
                      }}
                    />
                  </div>
                  {errors.customerName && (
                    <p className="text-xs text-red-400 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929BA6] mb-1.5">
                    Số Điện Thoại Liên Hệ <span className="text-[#0078D6]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#929BA6] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="0901 234 567"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#0078D6]"
                      style={{
                        backgroundColor: '#0B0D10',
                        borderColor: errors.phone ? '#EF4444' : '#303740',
                        color: '#F4F5F6'
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929BA6] mb-1.5">
                    Địa Chỉ Email (Tùy chọn)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#929BA6] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="quan.nguyen@company.vn"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#0078D6]"
                      style={{
                        backgroundColor: '#0B0D10',
                        borderColor: errors.email ? '#EF4444' : '#303740',
                        color: '#F4F5F6'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929BA6] mb-1.5">
                    Mẫu Xe BMW Trải Nghiệm <span className="text-[#0078D6]">*</span>
                  </label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-[#929BA6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#0078D6]"
                      style={{
                        backgroundColor: '#0B0D10',
                        borderColor: errors.vehicleModel ? '#EF4444' : '#303740',
                        color: '#F4F5F6'
                      }}
                    >
                      {BAVARIA_VEHICLES.map((v) => (
                        <option key={v.id} value={v.name} style={{ backgroundColor: '#0B0D10' }}>
                          {v.name} ({v.priceFormatted})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929BA6] mb-1.5">
                    Ngày Lái Thử Mong Muốn <span className="text-[#0078D6]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#929BA6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#0078D6]"
                      style={{
                        backgroundColor: '#0B0D10',
                        borderColor: errors.preferredDate ? '#EF4444' : '#303740',
                        color: '#F4F5F6',
                        colorScheme: 'dark'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929BA6] mb-1.5">
                    Khung Giờ Ưu Tiên <span className="text-[#0078D6]">*</span>
                    {loadingSlots && (
                      <span className="ml-2 text-[10px] text-[#929BA6] lowercase">
                        (đang kiểm tra lịch trống...)
                      </span>
                    )}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map((slot) => {
                      const isSelected = preferredTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={slot.isBooked}
                          onClick={() => setPreferredTime(slot.time)}
                          className="px-2.5 py-2.5 text-xs rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          style={{
                            backgroundColor: slot.isBooked
                              ? 'rgba(28, 34, 42, 0.4)'
                              : isSelected
                              ? 'rgba(0, 120, 214, 0.25)'
                              : '#0B0D10',
                            borderColor: slot.isBooked
                              ? '#22272E'
                              : isSelected
                              ? '#0078D6'
                              : '#303740',
                            color: slot.isBooked
                              ? '#525A65'
                              : isSelected
                              ? '#F4F5F6'
                              : '#929BA6',
                            cursor: slot.isBooked ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{slot.isBooked ? `${slot.time} (Kín)` : slot.time}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#929BA6] mb-1.5">
                  Ghi Chú Hoặc Yêu Cầu Đặc Biệt (Tùy chọn)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#929BA6] absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Ví dụ: Mong muốn trải nghiệm hàng ghế sau Executive Lounge hoặc tư vấn thêm về phương án thu cũ đổi mới..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#0078D6] resize-none"
                    style={{
                      backgroundColor: '#0B0D10',
                      borderColor: '#303740',
                      color: '#F4F5F6'
                    }}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#929BA6] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#0078D6] shrink-0 mt-0.5" />
                <span>
                  Thông tin của Quý khách được bảo mật tuyệt đối và chuyển trực tiếp đến bộ phận Cố vấn Dịch vụ Bavaria Motor House. Lịch hẹn sẽ ở trạng thái chờ xác nhận cho đến khi chuyên viên liên hệ trực tiếp.
                </span>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3 border-t border-[#303740]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-[#929BA6] hover:text-[#F4F5F6] border border-[#303740] cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-3 rounded-full text-xs font-semibold text-white bg-[#0078D6] hover:bg-[#0062B0] shadow-lg shadow-[#0078D6]/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Đang Gửi Yêu Cầu...' : 'Gửi Yêu Cầu Đặt Lịch Lái Thử'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
