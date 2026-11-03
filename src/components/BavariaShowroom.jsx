import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Search,
  SlidersHorizontal,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Sparkles,
  ShieldCheck,
  Award,
  Compass,
  Phone,
  MapPin,
  Clock,
  Mail,
  CheckCircle2,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Car,
  CreditCard
} from 'lucide-react';
import {
  BAVARIA_CATEGORIES,
  BAVARIA_MODEL_FAMILIES,
  BAVARIA_VEHICLES,
  BAVARIA_SERVICES
} from '../data/bavariaVehicles';
import BavariaBookingModal from './BavariaBookingModal';
import BmwConcierge from './BmwConcierge';
import {
  submitBavariaTestDriveBooking,
  isValidVietnamPhone,
  BAVARIA_TIME_SLOTS
} from '../services/bavariaAutoLeadAdapter';
import { getAssetUrl } from '../utils/asset';

const NAV_ITEMS = [
  { id: 'home', label: 'Các dòng xe', labelEn: 'Models' },
  { id: 'collection', label: 'Mua trực tuyến', labelEn: 'Our Collection' },
  { id: 'services', label: 'Dịch vụ', labelEn: 'Services' },
  { id: 'about', label: 'Thương hiệu', labelEn: 'Brand & Heritage' },
  { id: 'contact', label: 'Liên hệ', labelEn: 'Contact' }
];

const PRICE_RANGES = [
  { id: 'all', label: 'Mọi mức ngân sách' },
  { id: 'under-4b', label: 'Dưới 4 Tỷ VNĐ' },
  { id: '4b-5.5b', label: 'Từ 4 – 5,5 Tỷ VNĐ' },
  { id: 'above-5.5b', label: 'Trên 5,5 Tỷ VNĐ' }
];

export default function BavariaShowroom() {
  const [activePage, setActivePage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(BAVARIA_VEHICLES[0]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Video & Cinema Controls
  const heroVideoRef = useRef(null);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [heroMode, setHeroMode] = useState('video'); // 'video' | 'x7' | '7series'

  // Section 1 (Mercedes-style Floating Pill Tabs)
  const [recommendationTab, setRecommendationTab] = useState('featured');

  // Section 2 (Body Type Filter)
  const [powertrainFilter, setPowertrainFilter] = useState('all');

  // Collection Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Shared Test-Drive Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingModalConfig, setBookingModalConfig] = useState({
    vehicleModel: '',
    leadSource: 'website_booking',
    conversationSummary: ''
  });

  // External prompt passed to BMW Concierge
  const [conciergePrompt, setConciergePrompt] = useState(null);

  // Contact Page Inquiry State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleModel: BAVARIA_VEHICLES[0].name,
    message: ''
  });
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmittedRecord, setContactSubmittedRecord] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedVehicle?.id]);

  const toggleHeroVideoPlay = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsHeroPlaying(true);
    } else {
      vid.pause();
      setIsHeroPlaying(false);
    }
  };

  const toggleHeroVideoMute = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsHeroMuted(vid.muted);
  };

  const handleOpenBookingModal = ({
    vehicleModel = '',
    leadSource = 'website_booking',
    conversationSummary = ''
  } = {}) => {
    setBookingModalConfig({
      vehicleModel: vehicleModel || selectedVehicle?.name || BAVARIA_VEHICLES[0].name,
      leadSource,
      conversationSummary
    });
    setBookingModalOpen(true);
  };

  const handleOpenVehicleDetail = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveGalleryIndex(0);
    setActivePage('detail');
    setMobileMenuOpen(false);
  };

  const handleExploreCategory = (category) => {
    setSelectedCategory(category);
    setActivePage('collection');
    setMobileMenuOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFamily('all');
    setSelectedPriceRange('all');
    setSelectedYear('all');
    setSelectedCondition('all');
    setSortBy('featured');
  };

  const filteredVehicles = useMemo(() => {
    return BAVARIA_VEHICLES.filter((vehicle) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesText =
          vehicle.name.toLowerCase().includes(q) ||
          vehicle.shortName.toLowerCase().includes(q) ||
          vehicle.chassis.toLowerCase().includes(q) ||
          vehicle.category.toLowerCase().includes(q) ||
          vehicle.engine.toLowerCase().includes(q) ||
          vehicle.summary.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      if (selectedCategory !== 'all' && vehicle.category !== selectedCategory) {
        return false;
      }

      if (selectedFamily !== 'all' && vehicle.family !== selectedFamily) {
        return false;
      }

      if (selectedPriceRange === 'under-4b' && vehicle.priceNumeric >= 4000000000) {
        return false;
      }
      if (
        selectedPriceRange === '4b-5.5b' &&
        (vehicle.priceNumeric < 4000000000 || vehicle.priceNumeric > 5500000000)
      ) {
        return false;
      }
      if (selectedPriceRange === 'above-5.5b' && vehicle.priceNumeric <= 5500000000) {
        return false;
      }

      if (selectedYear !== 'all' && String(vehicle.year) !== String(selectedYear)) {
        return false;
      }

      if (selectedCondition !== 'all' && vehicle.condition !== selectedCondition) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'newest') return b.year - a.year;
      return Number(b.featured) - Number(a.featured);
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedFamily,
    selectedPriceRange,
    selectedYear,
    selectedCondition,
    sortBy
  ]);

  const similarVehicles = useMemo(() => {
    if (!selectedVehicle) return BAVARIA_VEHICLES.slice(0, 3);
    const sameCat = BAVARIA_VEHICLES.filter(
      (v) => v.id !== selectedVehicle.id && v.category === selectedVehicle.category
    );
    const others = BAVARIA_VEHICLES.filter(
      (v) => v.id !== selectedVehicle.id && v.category !== selectedVehicle.category
    );
    return [...sameCat, ...others].slice(0, 3);
  }, [selectedVehicle]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!contactForm.name || contactForm.name.trim().length < 2) {
      errs.name = 'Vui lòng nhập họ và tên của Quý khách.';
    }
    if (!contactForm.phone || !isValidVietnamPhone(contactForm.phone)) {
      errs.phone = 'Vui lòng nhập số điện thoại 10 chữ số hợp lệ.';
    }
    setContactErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setContactSubmitting(true);
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      const res = await submitBavariaTestDriveBooking({
        customer_name: contactForm.name,
        phone: contactForm.phone,
        email: contactForm.email,
        vehicle_model: contactForm.vehicleModel,
        preferred_date: dateStr,
        preferred_time: BAVARIA_TIME_SLOTS[1],
        customer_notes:
          contactForm.message || 'Gửi yêu cầu tư vấn từ trang Liên Hệ Bavaria Motor House',
        lead_source: 'website_booking',
        conversation_summary:
          'Khách hàng gửi biểu mẫu tư vấn & đăng ký lái thử từ trang Liên Hệ Bavaria Motor House.'
      });

      setContactSubmittedRecord(res.record);
    } finally {
      setContactSubmitting(false);
    }
  };

  const v750e = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-750e-g70') || BAVARIA_VEHICLES[0];
  const vx7 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-x7-m60i-g07' || v.family === 'X7') || BAVARIA_VEHICLES[1];
  const vm4 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-m4-comp-g82') || BAVARIA_VEHICLES[2];
  const vx5 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-x5-g05-lci') || BAVARIA_VEHICLES[3];
  const vi7 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-i7-xdrive60-g70') || BAVARIA_VEHICLES[4];
  const v530i = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-530i-g60') || BAVARIA_VEHICLES[5];

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-white text-[#11151C] selection:bg-[#0066CC] selection:text-white"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      {/* 1. TOP ECOSYSTEM BAR */}
      <div className="w-full bg-[#050608] border-b border-white/10 px-4 sm:px-8 py-2 text-[11px] text-[#9CA3AF]">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0078D6]" />
            <span className="tracking-[0.14em] uppercase text-white/80">
              BAVARIA MOTOR HOUSE — INDEPENDENT PREMIUM BMW SALON • VIETNAM
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-white/40 text-[10px] tracking-wider uppercase font-mono">
            <span>Official Dealer Simulator</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Pure Black Navigation Header */}
      <header className="sticky top-0 z-[70] w-full bg-black text-white border-b border-white/10">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          <nav className="hidden lg:flex items-center gap-7" aria-label="Điều hướng chính">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activePage === item.id ||
                (activePage === 'detail' && item.id === 'collection');
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePage(item.id)}
                  className={`relative py-2 text-[13px] tracking-wide transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-white/70 hover:text-white font-normal'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0078D6]" />
                  )}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left lg:mx-auto focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center bg-gradient-to-br from-[#0066CC] via-[#0B0D10] to-white/90 shadow-md">
              <div className="w-6 h-6 rounded-full border border-white/60 grid grid-cols-2 overflow-hidden">
                <span className="bg-[#0066CC]" />
                <span className="bg-white" />
                <span className="bg-white" />
                <span className="bg-[#0066CC]" />
              </div>
            </div>
            <div>
              <span
                className="block text-base sm:text-lg font-medium tracking-[0.2em] text-white leading-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                BAVARIA MOTOR HOUSE
              </span>
              <span className="block text-[9px] tracking-[0.24em] text-white/60 uppercase mt-1">
                ENGINEERED FOR THOSE WHO LEAD
              </span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActivePage('collection')}
              className="p-2.5 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Tìm kiếm mẫu xe"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() =>
                handleOpenBookingModal({
                  vehicleModel:
                    activePage === 'detail' && selectedVehicle
                      ? selectedVehicle.name
                      : BAVARIA_VEHICLES[0].name,
                  leadSource: 'website_booking'
                })
              }
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] transition-all cursor-pointer shadow-lg shadow-[#0078D6]/30"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Đặt lịch lái thử</span>
            </button>

            {/* Quick Back to AutoLead */}
            <a
              href="https://dai27022006-lab.github.io/autolead-systems111/#/"
              onClick={(e) => {
                if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
                  e.preventDefault();
                  window.parent.location.hash = '#/';
                }
              }}
              className="hidden md:inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer whitespace-nowrap"
              title="Quay lại trang chủ AutoLead Systems"
            >
              <span>← Về Trang Chủ</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2.5 text-white border border-white/20 rounded-lg"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0D10] border-t border-white/15 px-5 py-6 space-y-4">
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-3 px-3 border-b border-white/10 text-left text-sm text-white"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-white/50">{item.labelEn}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenBookingModal({
                  vehicleModel: BAVARIA_VEHICLES[0].name,
                  leadSource: 'website_booking'
                });
              }}
              className="w-full py-3.5 rounded-full text-xs font-semibold text-white bg-[#0078D6] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt lịch lái thử ngay</span>
            </button>

            <a
              href="https://dai27022006-lab.github.io/autolead-systems111/#/"
              onClick={(e) => {
                if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
                  e.preventDefault();
                  window.parent.location.hash = '#/';
                }
              }}
              className="w-full py-3 rounded-full text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <span>← Quay về Trang chủ AutoLead</span>
            </a>
          </div>
        )}
      </header>

      {/* VIEW 1: HOMEPAGE */}
      {activePage === 'home' && (
        <main>
          {/* SECTION 1: FULL-BLEED CINEMATIC VIDEO HERO */}
          <section className="relative h-[84vh] min-h-[600px] max-h-[860px] w-full bg-black text-white overflow-hidden">
            {heroMode === 'video' ? (
              <video
                ref={heroVideoRef}
                src={getAssetUrl('/bavaria/bmw-hero-vision.webm')}
                poster={getAssetUrl('/bavaria/bmw-x7-main.jpg')}
                autoPlay
                loop
                muted={isHeroMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
              />
            ) : heroMode === 'x7' ? (
              <img
                src={getAssetUrl('/bavaria/bmw-x7-main.jpg')}
                alt="BMW X7 LCI Flagship SAV"
                className="absolute inset-0 w-full h-full object-cover object-center animate-fadeIn"
              />
            ) : (
              <img
                src={getAssetUrl('/bavaria/bmw-7-series-side.jpg')}
                alt="BMW 7 Series G70 Flagship Sedan"
                className="absolute inset-0 w-full h-full object-cover object-center animate-fadeIn"
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 48%, rgba(0,0,0,0.12) 100%)'
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 45%, rgba(0,0,0,0.88) 100%)'
              }}
            />

            <div
              className="hidden md:block absolute bottom-12 right-16 select-none pointer-events-none text-[110px] lg:text-[150px] font-light tracking-[0.12em] text-white/20 leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {heroMode === '7series' ? 'THE 7' : heroMode === 'x7' ? 'THE X7' : 'BAVARIA'}
            </div>

            <div className="relative z-10 max-w-[1380px] mx-auto h-full px-4 sm:px-8 flex flex-col justify-center">
              <div className="max-w-xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-[0.2em] text-white/90">
                  <Film className="w-3.5 h-3.5 text-[#0078D6]" />
                  <span>BAVARIA MOTOR HOUSE • CINEMA EXPERIENCE</span>
                </div>

                <h1
                  className="text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.14] text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Chào mừng đến với thế giới Bavaria Motor House
                </h1>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg">
                  Trải nghiệm nghệ thuật chế tác cơ khí xứ Bavaria qua những tuyệt tác{' '}
                  <strong className="text-white">BMW 7 Series</strong>,{' '}
                  <strong className="text-white">BMW X7</strong> và phân nhánh hiệu năng cao{' '}
                  <strong className="text-white">BMW M GmbH</strong>.
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setActivePage('collection')}
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-white border border-white/60 bg-black/35 hover:bg-white hover:text-black backdrop-blur-xs transition-all cursor-pointer"
                  >
                    Tìm hiểu thêm
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleOpenBookingModal({
                        vehicleModel: vx7.name,
                        leadSource: 'website_booking'
                      })
                    }
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] transition-all shadow-lg shadow-[#0078D6]/40 cursor-pointer"
                  >
                    Đặt lịch lái thử ngay
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-20 max-w-[1380px] mx-auto px-4 sm:px-8 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {heroMode === 'video' && (
                  <>
                    <button
                      type="button"
                      onClick={toggleHeroVideoPlay}
                      className="w-9 h-9 rounded-full border border-white/40 bg-black/50 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                      aria-label={isHeroPlaying ? 'Tạm dừng video' : 'Phát video'}
                    >
                      {isHeroPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleHeroVideoMute}
                      className="w-9 h-9 rounded-full border border-white/40 bg-black/50 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                      aria-label={isHeroMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                    >
                      {isHeroMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </>
                )}
                <span className="text-[11px] text-white/60 hidden sm:inline ml-1">
                  {heroMode === 'video'
                    ? 'Đang phát: BMW Vision Neue Klasse & Luxury Motion Film'
                    : heroMode === 'x7'
                    ? 'Đang xem: BMW X7 xDrive40i M Sport (G07 LCI)'
                    : 'Đang xem: BMW 750e xDrive Pure Excellence (G70)'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/15">
                <button
                  type="button"
                  onClick={() => setHeroMode('video')}
                  className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                    heroMode === 'video'
                      ? 'bg-[#0078D6] text-white font-medium'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Video Clip
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMode('x7')}
                  className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                    heroMode === 'x7'
                      ? 'bg-[#0078D6] text-white font-medium'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  THE X7
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMode('7series')}
                  className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                    heroMode === '7series'
                      ? 'bg-[#0078D6] text-white font-medium'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  THE 7
                </button>
              </div>
            </div>
          </section>

          {/* FLOATING PILL SWITCHER */}
          <div className="relative z-30 -mt-6 flex justify-center px-4">
            <div className="inline-flex items-center bg-white rounded-full p-1.5 shadow-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setRecommendationTab('featured')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  recommendationTab === 'featured'
                    ? 'bg-[#11151C] text-white shadow-xs'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Tìm hiểu thêm
              </button>
              <button
                type="button"
                onClick={() => setRecommendationTab('electric')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  recommendationTab === 'electric'
                    ? 'bg-[#11151C] text-white shadow-xs'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                BMW i & Plug-in Hybrid
              </button>
              <button
                type="button"
                onClick={() => setRecommendationTab('performance')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  recommendationTab === 'performance'
                    ? 'bg-[#11151C] text-white shadow-xs'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                BMW M GmbH
              </button>
            </div>
          </div>

          {/* SECTION 2: BENTO GRID */}
          <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-[1280px] mx-auto">
            <h2
              className="text-2xl sm:text-4xl font-normal text-[#11151C] mb-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Tìm hiểu thêm
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              <div className="lg:col-span-7 group relative h-[430px] sm:h-[470px] rounded-xl overflow-hidden bg-[#0B0D10] text-white shadow-md">
                <img
                  src={
                    recommendationTab === 'electric'
                      ? vi7.images.main
                      : recommendationTab === 'performance'
                      ? vm4.images.main
                      : v750e.images.main
                  }
                  alt={v750e.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.92) 100%)'
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#60A5FA] font-semibold block">
                    {recommendationTab === 'electric'
                      ? '100% ELECTRIC FLAGSHIP'
                      : recommendationTab === 'performance'
                      ? 'BMW M MOTORSPORT DNA'
                      : 'PLUG-IN HYBRID FLAGSHIP'}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-normal text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {recommendationTab === 'electric'
                      ? 'BMW i7 xDrive60 — Kỷ nguyên sang trọng thuần điện'
                      : recommendationTab === 'performance'
                      ? 'BMW M4 Competition G82 — Sức mạnh 510 mã lực'
                      : 'Tối ưu năng lượng cùng BMW 750e xDrive'}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2 max-w-xl">
                    {recommendationTab === 'electric'
                      ? vi7.summary
                      : recommendationTab === 'performance'
                      ? vm4.summary
                      : v750e.summary}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenVehicleDetail(
                          recommendationTab === 'electric'
                            ? vi7
                            : recommendationTab === 'performance'
                            ? vm4
                            : v750e
                        )
                      }
                      className="px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] transition-colors cursor-pointer"
                    >
                      Khám phá ngay
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenBookingModal({
                          vehicleModel: (
                            recommendationTab === 'electric'
                              ? vi7
                              : recommendationTab === 'performance'
                              ? vm4
                              : v750e
                          ).name,
                          leadSource: 'website_booking'
                        })
                      }
                      className="px-4 py-2.5 rounded-full text-xs font-medium text-white border border-white/40 hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      Đặt lịch lái thử
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 group relative h-[430px] sm:h-[470px] rounded-xl overflow-hidden bg-[#0B0D10] text-white shadow-md">
                <img
                  src={vx5.images.main}
                  alt={vx5.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.92) 100%)'
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#60A5FA] font-semibold block">
                    SPORTS ACTIVITY VEHICLE
                  </span>
                  <h3
                    className="text-2xl font-normal text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Thông số BMW X5 (LCI) mới
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                    {vx5.summary}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenVehicleDetail(vx5)}
                      className="px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] transition-colors cursor-pointer"
                    >
                      Khám phá ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  watermark: 'M4',
                  vehicle: vm4,
                  headline: 'BMW M4 Competition',
                  sub: 'Tuyệt tác Coupé hiệu năng cao S58 510 HP với mui sợi carbon CFRP.'
                },
                {
                  watermark: 'THE 5',
                  vehicle: v530i,
                  headline: 'Biểu tượng 5 Series G60',
                  sub: 'Thế hệ sedan doanh nhân hoàn toàn mới với dải pha lê Interaction Bar.'
                },
                {
                  watermark: 'X7',
                  vehicle: vx7,
                  headline: 'BMW X7 Pure Luxury',
                  sub: 'Chuẩn mực SAV 7 chỗ đầu bảng với hệ thống treo khí nén 2 trục.'
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="group relative h-[430px] rounded-xl overflow-hidden bg-[#0B0D10] text-white shadow-md"
                >
                  <img
                    src={card.vehicle.images.main}
                    alt={card.vehicle.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 38%, rgba(0,0,0,0.92) 100%)'
                    }}
                  />
                  <div
                    className="absolute top-6 inset-x-0 text-center text-5xl sm:text-6xl font-normal tracking-[0.14em] text-white/80 select-none pointer-events-none"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {card.watermark}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 space-y-2.5">
                    <h3
                      className="text-xl font-normal text-white"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {card.headline}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                      {card.sub}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleOpenVehicleDetail(card.vehicle)}
                        className="px-5 py-2 rounded-full text-xs font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] transition-colors cursor-pointer"
                      >
                        Khám phá ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: BODY-TYPE SILHOUETTES */}
          <section className="py-14 sm:py-18 px-4 sm:px-8 max-w-[1280px] mx-auto border-t border-gray-200">
            <div className="max-w-3xl space-y-2 mb-8">
              <h2
                className="text-2xl sm:text-4xl font-normal text-[#11151C] leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Sự kết hợp hoàn hảo giữa sự sang trọng, tính thể thao và hiệu suất:
                <br />
                <span className="text-gray-600">Khám phá các mẫu xe mới nhất của chúng tôi</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                onClick={() => setPowertrainFilter('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  powertrainFilter === 'all'
                    ? 'bg-[#11151C] text-white border-[#11151C]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                Tất cả các dòng xe
              </button>
              <button
                type="button"
                onClick={() => setPowertrainFilter('electrified')}
                className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  powertrainFilter === 'electrified'
                    ? 'bg-[#11151C] text-white border-[#11151C]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                Dòng xe Thuần điện & Plug-in Hybrid
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  category: 'Luxury Sedan',
                  label: 'Khám phá',
                  title: 'Sedan Hạng Sang',
                  subtitle:
                    powertrainFilter === 'electrified'
                      ? 'BMW i7 xDrive60 • BMW 750e PHEV'
                      : 'BMW 7 Series • BMW i7 • BMW 5 Series',
                  img: getAssetUrl('/bavaria/bmw-5-series-main.jpg')
                },
                {
                  category: 'Premium SUV',
                  label: 'Khám phá',
                  title: 'Xe địa hình / SUV',
                  subtitle: 'BMW X7 LCI (7 chỗ) • BMW X5 LCI (5 chỗ)',
                  img: getAssetUrl('/bavaria/bmw-x7-main.jpg')
                },
                {
                  category: 'High Performance',
                  label: 'Khám phá',
                  title: 'Coupé & BMW M Thể thao',
                  subtitle: 'BMW M4 Competition • BMW M3 • 8 Series • Z4',
                  img: getAssetUrl('/bavaria/bmw-8-series-side.jpg')
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleExploreCategory(item.category)}
                  className="group relative rounded-xl bg-[#F3F5F8] hover:bg-[#EAEFF5] border border-gray-200/80 p-6 flex items-center justify-between gap-4 cursor-pointer transition-all overflow-hidden"
                >
                  <div className="z-10 space-y-1">
                    <span className="text-[11px] text-gray-500 block">{item.label}</span>
                    <h3
                      className="text-xl font-normal text-[#11151C] group-hover:text-[#0078D6] transition-colors"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500">{item.subtitle}</p>
                  </div>

                  <div className="w-36 sm:w-44 h-24 rounded-lg overflow-hidden shrink-0 shadow-xs">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: 3-COL PRODUCT CARDS */}
          <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-[1280px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <h2
                  className="text-2xl sm:text-4xl font-normal text-[#11151C]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Khám phá các mẫu xe hiện có
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Các mẫu xe trưng bày sẵn sàng phục vụ lịch hẹn trải nghiệm thực tế tại Bavaria Motor House
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActivePage('collection')}
                className="text-xs font-medium text-[#0078D6] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Xem toàn bộ {BAVARIA_VEHICLES.length} xe trưng bày</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[v530i, vx5, v750e].map((vehicle) => (
                <article
                  key={vehicle.id}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div
                    onClick={() => handleOpenVehicleDetail(vehicle)}
                    className="p-5 pb-0 cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#F4F6F8]">
                      <img
                        src={vehicle.images.main}
                        alt={vehicle.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/75 text-white">
                        {vehicle.condition === 'New' ? 'Xe Mới Có Sẵn' : 'Xe Lướt Tuyển Chọn'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 text-center space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3
                        onClick={() => handleOpenVehicleDetail(vehicle)}
                        className="text-lg font-semibold text-[#11151C] group-hover:text-[#0078D6] transition-colors cursor-pointer"
                      >
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Giá tham khảo từ{' '}
                        <strong className="text-[#11151C] font-semibold">
                          {vehicle.priceFormatted}
                        </strong>
                      </p>
                    </div>

                    <div className="bg-[#F5F6F8] rounded-lg p-3.5 text-[11px] text-gray-600 space-y-1.5">
                      <div className="font-medium text-[#11151C] truncate">
                        {vehicle.engine}
                      </div>
                      <div>
                        Tăng tốc 0–100 km/h: <strong>{vehicle.acceleration}</strong> •{' '}
                        {vehicle.seatingCapacity.split(' ')[0]} chỗ
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-medium">
                        Mã {vehicle.chassis}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-medium">
                        Năm {vehicle.year}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#EBF5FF] text-[#0066CC] text-[11px] font-medium">
                        Sẵn xe lái thử
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenVehicleDetail(vehicle)}
                        className="flex-1 py-2.5 text-xs font-medium text-[#0078D6] hover:underline cursor-pointer"
                      >
                        Chi tiết thông số &gt;
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenBookingModal({
                            vehicleModel: vehicle.name,
                            leadSource: 'website_booking'
                          })
                        }
                        className="px-4 py-2 rounded-full text-xs font-medium bg-[#0078D6] text-white hover:bg-[#0062B0] transition-colors cursor-pointer"
                      >
                        Lái thử
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-[#F4F6F9] border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[#11151C]">
                  Bạn đang tìm kiếm phiên bản hoặc cấu hình BMW khác?
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Khám phá toàn bộ các mẫu xe BMW mới và xe lướt tuyển chọn đang có sẵn tại Bavaria Motor House.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('collection')}
                className="px-6 py-3 rounded-full text-xs font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] transition-colors shrink-0 cursor-pointer"
              >
                Xem các xe có sẵn
              </button>
            </div>
          </section>

          {/* SECTION 5: SERVICES + VIDEO CLIP */}
          <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-[1280px] mx-auto border-t border-gray-200">
            <h2
              className="text-2xl sm:text-4xl font-normal text-[#11151C] mb-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Dịch vụ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group flex flex-col justify-between space-y-4">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black shadow-md">
                  <video
                    src={getAssetUrl('/bavaria/bmw-loop-motion.webm')}
                    poster={getAssetUrl('/bavaria/bmw-m4-main.jpg')}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 65%, transparent 100%)'
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 p-6 sm:p-8 flex flex-col justify-center max-w-xs text-white">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#60A5FA] mb-1">
                      LIVE MOTION STUDIO
                    </span>
                    <div
                      className="text-xl sm:text-2xl font-normal leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Tối đa an tâm trên mọi hành trình
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-base font-semibold text-[#11151C]">
                    Thẩm định kỹ thuật 360° & Bảo dưỡng tiêu chuẩn Đức
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Mỗi chiếc BMW tại Bavaria Motor House đều trải qua quy trình kiểm tra chuyên sâu hệ thống động cơ TwinPower Turbo, hộp số Steptronic và hệ thống treo khí nén trước khi bàn giao.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActivePage('services')}
                      className="px-5 py-2 rounded-full text-xs font-medium text-[#11151C] border border-gray-300 hover:border-black transition-colors cursor-pointer"
                    >
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              </div>

              <div className="group flex flex-col justify-between space-y-4">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#11151C] shadow-md">
                  <img
                    src={getAssetUrl('/bavaria/bmw-8-series-side.jpg')}
                    alt="Dịch vụ tư vấn cá nhân hóa 1:1 tại Bavaria Motor House"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-base font-semibold text-[#11151C]">
                    Đặc quyền Tư vấn 1:1 & Đặt lịch lái thử tự động AutoLead
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Trải nghiệm không gian Private Lounge riêng tư, hỗ trợ giải pháp tài chính doanh nghiệp, thu cũ đổi mới minh bạch và đặt lịch lái thử chống trùng giờ thông minh.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenBookingModal({
                          vehicleModel: BAVARIA_VEHICLES[0].name,
                          leadSource: 'website_booking'
                        })
                      }
                      className="px-5 py-2 rounded-full text-xs font-medium text-[#11151C] border border-gray-300 hover:border-black transition-colors cursor-pointer"
                    >
                      Đặt lịch tư vấn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: HERITAGE */}
          <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-[1280px] mx-auto border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#0078D6] font-semibold block">
                  DI SẢN CƠ KHÍ BAVARIA
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-normal text-[#11151C] leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  VỊ THẾ VƯỢT THỜI GIAN TỪ 1916.
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Định hình tương lai của nghệ thuật di chuyển hạng sang: Tại{' '}
                  <strong className="text-[#11151C]">Bavaria Motor House</strong>, chúng tôi tôn vinh triết lý <em>Sheer Driving Pleasure</em> qua không gian trưng bày chuẩn mực, kết hợp khoang lái kỹ thuật số BMW Curved Display và chế tác da thủ công BMW Individual Merino.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActivePage('about')}
                    className="px-6 py-3 rounded-full text-xs font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] transition-colors cursor-pointer"
                  >
                    Tìm hiểu thêm
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                  <img
                    src={getAssetUrl('/bavaria/bmw-interior-dash.jpg')}
                    alt="Khoang lái BMW Curved Display và dải pha lê Interaction Bar"
                    className="w-full h-[360px] sm:h-[420px] object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: 4 QUICK-ACTION BOXES */}
          <section className="py-10 pb-20 px-4 sm:px-8 max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Car,
                  title: 'Các dòng xe có sẵn',
                  desc: 'Xem ngay bộ sưu tập BMW mới & xe lướt tuyển chọn tại salon',
                  action: () => setActivePage('collection')
                },
                {
                  icon: Calendar,
                  title: 'Đặt lịch lái thử',
                  desc: 'Đăng ký khung giờ trải nghiệm thực tế cùng chuyên gia sản phẩm',
                  action: () =>
                    handleOpenBookingModal({
                      vehicleModel: BAVARIA_VEHICLES[0].name,
                      leadSource: 'website_booking'
                    })
                },
                {
                  icon: CreditCard,
                  title: 'Tư vấn tài chính & Thu cũ',
                  desc: 'Giải pháp tài chính doanh nghiệp & định giá nâng cấp xe minh bạch',
                  action: () => setActivePage('services')
                },
                {
                  icon: MapPin,
                  title: 'Liên hệ Showroom',
                  desc: 'Đặt lịch hẹn Private Lounge hoặc nhận tư vấn qua BMW Concierge',
                  action: () => setActivePage('contact')
                }
              ].map((box, idx) => {
                const IconComp = box.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={box.action}
                    className="group p-6 rounded-xl bg-[#F4F6F8] hover:bg-[#EAEFF5] border border-gray-200/80 text-center flex flex-col items-center space-y-2.5 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#11151C] group-hover:text-[#0078D6] shadow-2xs transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#11151C] group-hover:text-[#0078D6] transition-colors">
                      {box.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{box.desc}</p>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: COLLECTION */}
      {activePage === 'collection' && (
        <main className="py-12 sm:py-16 px-4 sm:px-8 max-w-[1280px] mx-auto">
          <div className="border-b border-gray-200 pb-8 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#0078D6] font-semibold block mb-2">
                OUR COLLECTION • BỘ SƯU TẬP XE TRƯNG BÀY
              </span>
              <h1
                className="text-3xl sm:text-5xl font-normal text-[#11151C]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Khám Phá Dải Sản Phẩm BMW
              </h1>
              <p className="text-sm text-gray-600 mt-2 max-w-2xl">
                Tất cả mẫu xe tại Bavaria Motor House đều đi kèm thông số kỹ thuật minh bạch, hình ảnh thực tế và sẵn sàng phục vụ lịch hẹn trải nghiệm lái thử theo khung giờ riêng.
              </p>
            </div>

            <div className="text-xs text-gray-500 uppercase tracking-[0.16em]">
              Hiển thị{' '}
              <span className="text-[#11151C] font-semibold">{filteredVehicles.length}</span> /{' '}
              {BAVARIA_VEHICLES.length} tuyệt tác BMW
            </div>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-6">
            {BAVARIA_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#11151C] text-white border-[#11151C]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="p-5 rounded-xl bg-[#F4F6F9] border border-gray-200 mb-10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
              <div className="sm:col-span-2 relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên mẫu xe (750e, X7, M4, G70...)"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg bg-white border border-gray-300 text-[#11151C] focus:outline-none focus:border-[#0078D6]"
                />
              </div>

              <div>
                <select
                  value={selectedFamily}
                  onChange={(e) => setSelectedFamily(e.target.value)}
                  aria-label="Lọc theo dòng xe"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg bg-white border border-gray-300 text-[#11151C] focus:outline-none focus:border-[#0078D6]"
                >
                  {BAVARIA_MODEL_FAMILIES.map((fam) => (
                    <option key={fam.id} value={fam.id}>
                      {fam.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  aria-label="Lọc theo khoảng giá"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg bg-white border border-gray-300 text-[#11151C] focus:outline-none focus:border-[#0078D6]"
                >
                  {PRICE_RANGES.map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {pr.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  aria-label="Lọc theo tình trạng xe"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg bg-white border border-gray-300 text-[#11151C] focus:outline-none focus:border-[#0078D6]"
                >
                  <option value="all">Tất cả tình trạng</option>
                  <option value="New">Xe Mới (New)</option>
                  <option value="Pre-owned">Xe Lướt Tuyển Chọn (Pre-owned)</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  aria-label="Lọc theo năm sản xuất"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg bg-white border border-gray-300 text-[#11151C] focus:outline-none focus:border-[#0078D6]"
                >
                  <option value="all">Tất cả năm SX</option>
                  <option value="2025">Năm 2025</option>
                  <option value="2024">Năm 2024</option>
                  <option value="2023">Năm 2023</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-medium text-gray-600">Sắp xếp theo:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sắp xếp danh sách xe"
                  className="px-3 py-1.5 text-xs rounded-lg bg-white border border-gray-300 text-[#11151C] focus:outline-none"
                >
                  <option value="featured">Đề xuất nổi bật (Featured)</option>
                  <option value="newest">Năm sản xuất mới nhất</option>
                  <option value="price-asc">Giá tham khảo: Thấp đến Cao</option>
                  <option value="price-desc">Giá tham khảo: Cao đến Thấp</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#0078D6] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xóa bộ lọc (Reset Filters)</span>
              </button>
            </div>
          </div>

          {filteredVehicles.length === 0 ? (
            <div className="p-12 rounded-xl bg-[#F4F6F9] border border-gray-200 text-center space-y-4">
              <p
                className="text-xl text-[#11151C]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Không tìm thấy mẫu xe BMW phù hợp với bộ lọc hiện tại
              </p>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Quý khách vui lòng điều chỉnh lại tiêu chí tìm kiếm hoặc nhấn nút bên dưới để xem toàn bộ danh mục xe trưng bày tại Bavaria Motor House.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-6 py-3 rounded-full text-xs font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] cursor-pointer"
              >
                Khôi phục toàn bộ danh sách xe
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredVehicles.map((vehicle) => (
                <article
                  key={vehicle.id}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div
                    onClick={() => handleOpenVehicleDetail(vehicle)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={vehicle.images.main}
                      alt={vehicle.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-black/80 text-white">
                        {vehicle.badge}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-medium text-white ${
                          vehicle.condition === 'New' ? 'bg-[#0078D6]' : 'bg-gray-900/90'
                        }`}
                      >
                        {vehicle.condition === 'New' ? 'Xe Mới' : `Xe Lướt • ${vehicle.mileage}`}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-gray-500">
                        <span>
                          {vehicle.category} • Mã {vehicle.chassis}
                        </span>
                        <span>Năm {vehicle.year}</span>
                      </div>

                      <h2
                        onClick={() => handleOpenVehicleDetail(vehicle)}
                        className="text-lg sm:text-xl font-medium text-[#11151C] group-hover:text-[#0078D6] transition-colors cursor-pointer"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {vehicle.name}
                      </h2>

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {vehicle.summary}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                          0–100 km/h: {vehicle.acceleration}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                          {vehicle.seatingCapacity.split(' ')[0]} chỗ
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-[11px] text-gray-500 block">
                          Giá tham khảo (Indicative Price)
                        </span>
                        <span className="text-lg font-bold text-[#11151C]">
                          {vehicle.priceFormatted}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleOpenVehicleDetail(vehicle)}
                          className="py-2.5 px-3 rounded-full text-xs font-medium border border-gray-300 text-[#11151C] hover:border-black transition-colors cursor-pointer"
                        >
                          Xem chi tiết
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenBookingModal({
                              vehicleModel: vehicle.name,
                              leadSource: 'website_booking'
                            })
                          }
                          className="py-2.5 px-3 rounded-full text-xs font-medium text-white bg-[#0078D6] hover:bg-[#0062B0] transition-colors cursor-pointer"
                        >
                          Đặt lịch lái thử
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      )}

      {/* VIEW 3: DETAIL */}
      {activePage === 'detail' && selectedVehicle && (
        <main className="py-10 sm:py-14 px-4 sm:px-8 max-w-[1280px] mx-auto space-y-16">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <button
              type="button"
              onClick={() => setActivePage('collection')}
              className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-[#0078D6] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại Bộ sưu tập xe</span>
            </button>

            <div className="text-xs text-gray-500">
              <span>Bộ sưu tập</span>
              <span className="mx-2">/</span>
              <span>{selectedVehicle.category}</span>
              <span className="mx-2">/</span>
              <span className="text-[#11151C] font-medium">{selectedVehicle.shortName}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-xl border border-gray-200 bg-black overflow-hidden shadow-md">
                <img
                  src={
                    selectedVehicle.images.gallery[activeGalleryIndex]?.url ||
                    selectedVehicle.images.main
                  }
                  alt={
                    selectedVehicle.images.gallery[activeGalleryIndex]?.caption ||
                    selectedVehicle.name
                  }
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-center justify-between gap-4">
                  <span className="text-xs text-white">
                    {selectedVehicle.images.gallery[activeGalleryIndex]?.caption}
                  </span>
                  <span className="text-xs font-mono text-white/75 shrink-0">
                    {activeGalleryIndex + 1} / {selectedVehicle.images.gallery.length}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {selectedVehicle.images.gallery.map((imgItem, idx) => {
                  const isCurrent = idx === activeGalleryIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#0078D6] opacity-100 shadow-xs'
                          : 'border-transparent opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgItem.url}
                        alt={imgItem.caption}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EBF5FF] text-[#0066CC]">
                    {selectedVehicle.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] bg-gray-100 text-gray-700">
                    Mã khung gầm: {selectedVehicle.chassis}
                  </span>
                </div>

                <h1
                  className="text-2xl sm:text-4xl font-normal text-[#11151C] leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {selectedVehicle.name}
                </h1>

                <div className="p-5 rounded-xl bg-[#F4F6F9] border border-gray-200 space-y-1.5">
                  <span className="text-xs text-gray-500 block">
                    {selectedVehicle.priceNote}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-[#11151C]">
                    {selectedVehicle.priceFormatted}
                  </div>
                  <span className="text-xs text-gray-600 block">
                    Tình trạng: <strong className="text-[#11151C]">{selectedVehicle.conditionLabel}</strong> • Năm SX: <strong className="text-[#11151C]">{selectedVehicle.year}</strong> • ODO: <strong className="text-[#11151C]">{selectedVehicle.mileage}</strong>
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedVehicle.description}
                </p>

                <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2.5 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-gray-500">Màu sơn ngoại thất:</span>
                    <span className="text-[#11151C] font-semibold text-right">
                      {selectedVehicle.exteriorColor}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-2 border-t border-gray-100">
                    <span className="text-gray-500">Chất liệu nội thất:</span>
                    <span className="text-[#11151C] font-semibold text-right">
                      {selectedVehicle.interiorTrim}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    handleOpenBookingModal({
                      vehicleModel: selectedVehicle.name,
                      leadSource: 'website_booking'
                    })
                  }
                  className="w-full py-4 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#0078D6] hover:bg-[#0062B0] flex items-center justify-center gap-2.5 shadow-lg shadow-[#0078D6]/30 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Đặt lịch lái thử mẫu xe này</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setConciergePrompt({
                      id: Date.now(),
                      text: `Tư vấn chuyên sâu về mẫu ${selectedVehicle.name}`
                    })
                  }
                  className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium text-[#11151C] border border-gray-300 hover:border-black bg-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#0078D6]" />
                  <span>Hỏi Trợ lý BMW Concierge về xe này</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-gray-200">
            <div className="lg:col-span-6 space-y-5">
              <h2
                className="text-xl sm:text-2xl font-normal text-[#11151C]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Thông số kỹ thuật trọng tâm
              </h2>
              <div className="rounded-xl border border-gray-200 divide-y divide-gray-200 bg-white overflow-hidden">
                <div className="p-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
                  <span className="text-gray-500">Động cơ & Công suất</span>
                  <span className="text-[#11151C] font-medium text-right">
                    {selectedVehicle.engine}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
                  <span className="text-gray-500">Hộp số & Truyền động</span>
                  <span className="text-[#11151C] font-medium text-right">
                    {selectedVehicle.transmission}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
                  <span className="text-gray-500">Khả năng tăng tốc (0–100 km/h)</span>
                  <span className="text-[#11151C] font-medium text-right">
                    {selectedVehicle.acceleration}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
                  <span className="text-gray-500">Mức tiêu thụ / Phạm vi hoạt động</span>
                  <span className="text-[#11151C] font-medium text-right">
                    {selectedVehicle.fuelConsumption}
                  </span>
                </div>
                {selectedVehicle.specs.map((sp, i) => (
                  <div
                    key={i}
                    className="p-4 flex items-center justify-between gap-4 text-xs sm:text-sm"
                  >
                    <span className="text-gray-500">{sp.label}</span>
                    <span className="text-[#11151C] font-medium text-right">{sp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-5">
                <h2
                  className="text-xl sm:text-2xl font-normal text-[#11151C]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Trang bị & Công nghệ nổi bật
                </h2>
                <div className="p-6 rounded-xl border border-gray-200 bg-[#F4F6F9] space-y-3.5">
                  {selectedVehicle.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#0078D6] shrink-0 mt-0.5" />
                      <span className="text-[#11151C]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-white space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#0078D6] font-semibold block">
                  PHÙ HỢP VỚI PHONG CÁCH CHỦ NHÂN
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedVehicle.idealFor.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs bg-[#F4F6F9] text-[#11151C] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-200 space-y-8">
            <div className="flex items-center justify-between">
              <h2
                className="text-2xl font-normal text-[#11151C]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Các mẫu xe tương đương tại Salon
              </h2>
              <button
                type="button"
                onClick={() => setActivePage('collection')}
                className="text-xs font-medium text-[#0078D6] hover:underline cursor-pointer"
              >
                Xem tất cả →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarVehicles.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => handleOpenVehicleDetail(sim)}
                  className="group rounded-xl border border-gray-200 bg-white overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={sim.images.main}
                      alt={sim.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <div className="text-[11px] text-gray-500">
                      {sim.category} • {sim.chassis}
                    </div>
                    <div
                      className="text-base font-medium text-[#11151C] group-hover:text-[#0078D6]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {sim.name}
                    </div>
                    <div className="text-sm font-bold text-[#11151C]">
                      {sim.priceFormatted}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* VIEW 4: ABOUT */}
      {activePage === 'about' && (
        <main className="py-14 sm:py-20 px-4 sm:px-8 max-w-[1280px] mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-gray-200 pb-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.22em] text-[#0078D6] font-semibold block">
                ABOUT BAVARIA MOTOR HOUSE
              </span>
              <h1
                className="text-3xl sm:text-5xl font-normal text-[#11151C] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Nơi Di Sản Cơ Khí Bavaria Gặp Gỡ Chuẩn Mực Tư Vấn Đương Đại
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <strong className="text-[#11151C]">Bavaria Motor House</strong> được thành lập với tầm nhìn trở thành điểm đến độc lập uy tín hàng đầu tại Việt Nam chuyên trưng bày, thẩm định và tư vấn các dòng xe BMW cao cấp.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Thay vì mô hình đại lý truyền thống ồn ào, chúng tôi kiến tạo một không gian thưởng lãm mang đậm tính nghệ thuật sắp đặt — nơi mỗi chiếc BMW 7 Series, X7 hay M4 Competition được trưng bày như một tác phẩm điêu khắc cơ khí.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-lg">
                <img
                  src={getAssetUrl('/bavaria/bmw-8-series-side.jpg')}
                  alt="Không gian trưng bày THE 8 tại Bavaria Motor House"
                  className="w-full h-[380px] object-cover"
                />
                <div className="p-4 text-xs text-gray-500 border-t border-gray-100">
                  Không gian trưng bày BMW 8 Series Gran Coupé với ánh sáng studio chuẩn mực.
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-gray-200 bg-[#F4F6F9] space-y-4">
              <Award className="w-7 h-7 text-[#0078D6]" />
              <h2
                className="text-xl font-normal text-[#11151C]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                01. Tiêu Chuẩn Tuyển Chọn Khắt Khe
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Mỗi chiếc xe trưng bày tại salon — dù là xe mới 100% hay xe lướt tuyển chọn ODO thấp — đều trải qua quy trình thẩm định kỹ thuật nghiêm ngặt về khung gầm, động cơ TwinPower Turbo, hệ thống treo và lịch sử vận hành.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-gray-200 bg-[#F4F6F9] space-y-4">
              <Compass className="w-7 h-7 text-[#0078D6]" />
              <h2
                className="text-xl font-normal text-[#11151C]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                02. Trải Nghiệm Tư Vấn Cá Nhân Hóa
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Chúng tôi lắng nghe thói quen di chuyển, nhu cầu công việc và gu thẩm mỹ của từng vị khách để đối chiếu khách quan giữa các cấu hình, kết hợp trợ lý kỹ thuật số BMW CONCIERGE hoạt động 24/7.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-gray-200 bg-[#F4F6F9] space-y-4">
              <ShieldCheck className="w-7 h-7 text-[#0078D6]" />
              <h2
                className="text-xl font-normal text-[#11151C]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                03. Minh Bạch Định Vị Thương Hiệu
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Bavaria Motor House hoạt động với tư cách là showroom trưng bày và tư vấn xe BMW cao cấp độc lập (Independent Premium BMW Showroom), cung cấp thông tin minh bạch và dịch vụ chăm sóc tận tâm.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 5: SERVICES */}
      {activePage === 'services' && (
        <main className="py-14 sm:py-20 px-4 sm:px-8 max-w-[1280px] mx-auto space-y-16">
          <div className="border-b border-gray-200 pb-10 max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.22em] text-[#0078D6] font-semibold block">
              OUR SERVICES • HỆ SINH THÁI DỊCH VỤ SHOWROOM
            </span>
            <h1
              className="text-3xl sm:text-5xl font-normal text-[#11151C]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Chuẩn Mực Phục Vụ Xứng Tầm Chủ Nhân BMW
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Từ khâu tư vấn cấu hình, sắp xếp lộ trình lái thử riêng tư, thẩm định kỹ thuật cho đến giải pháp tài chính doanh nghiệp — mọi quy trình tại Bavaria Motor House đều được vận hành đồng bộ trên nền tảng AutoLead Systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {BAVARIA_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-8 rounded-xl border border-gray-200 bg-white shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs font-mono tracking-wider text-[#0078D6] font-semibold">
                      BAVARIA SERVICE // {srv.code}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      {srv.titleEn}
                    </span>
                  </div>

                  <h2
                    className="text-2xl font-normal text-[#11151C]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {srv.title}
                  </h2>

                  <p className="text-sm text-gray-600 leading-relaxed">{srv.shortDesc}</p>

                  <ul className="space-y-2.5 pt-2">
                    {srv.details.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#0078D6] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenBookingModal({
                        vehicleModel: BAVARIA_VEHICLES[0].name,
                        leadSource: 'website_booking'
                      })
                    }
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0078D6] hover:underline cursor-pointer"
                  >
                    <span>Đăng ký tư vấn dịch vụ này</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW 6: CONTACT */}
      {activePage === 'contact' && (
        <main className="py-14 sm:py-20 px-4 sm:px-8 max-w-[1280px] mx-auto space-y-16">
          <div className="border-b border-gray-200 pb-8 max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.22em] text-[#0078D6] font-semibold block">
              CONTACT & PRIVATE APPOINTMENT
            </span>
            <h1
              className="text-3xl sm:text-5xl font-normal text-[#11151C]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Liên Hệ & Đặt Lịch Hẹn Tại Bavaria Motor House
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Đội ngũ Cố vấn Dịch vụ của chúng tôi luôn sẵn sàng đón tiếp Quý khách tại không gian trưng bày hoặc sắp xếp lịch lái thử theo khung giờ ưu tiên.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-xl border border-gray-200 bg-[#F4F6F9] space-y-6">
                <h2
                  className="text-xl font-normal text-[#11151C]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Thông Tin Showroom Trưng Bày (Demo)
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#0078D6] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-gray-500 block">
                        Địa chỉ Salon (Minh họa dự án)
                      </span>
                      <span className="text-[#11151C] font-medium">
                        Khu Đô Thị Thủ Thiêm / Đại Lộ Lê Duẩn, Quận 1, TP. Hồ Chí Minh
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#0078D6] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-gray-500 block">Hotline Concierge Desk</span>
                      <span className="text-[#11151C] font-mono font-semibold">
                        0909 888 750 (Demo Line)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#0078D6] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-gray-500 block">Email Tư Vấn</span>
                      <span className="text-[#11151C]">concierge@bavariamotors-demo.vn</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#0078D6] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-gray-500 block">Giờ Đón Khách</span>
                      <span className="text-[#11151C]">
                        Thứ Hai – Chủ Nhật: 08:30 – 19:00 (Phục vụ lịch hẹn riêng ngoài giờ)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenBookingModal({
                        vehicleModel: BAVARIA_VEHICLES[0].name,
                        leadSource: 'website_booking'
                      })
                    }
                    className="w-full py-3.5 px-5 rounded-full text-xs font-semibold text-white bg-[#0078D6] hover:bg-[#0062B0] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Mở Lịch Đặt Giờ Lái Thử Chuyên Biệt</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-7 sm:p-9 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h2
                  className="text-2xl font-normal text-[#11151C] mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Gửi Yêu Cầu Tư Vấn & Đặt Lịch Nhanh
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-6">
                  Thông tin của Quý khách sẽ được đồng bộ trực tiếp vào hệ thống quản trị khách hàng AutoLead Systems của showroom.
                </p>

                {contactSubmittedRecord ? (
                  <div className="p-6 rounded-xl border border-[#0078D6] bg-[#EBF5FF] space-y-4">
                    <div className="flex items-center gap-3 text-[#0066CC]">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="text-xs uppercase tracking-wider font-semibold">
                        ĐÃ GỬI YÊU CẦU THÀNH CÔNG
                      </span>
                    </div>
                    <p className="text-base text-[#11151C] leading-relaxed">
                      Yêu cầu của bạn đã được gửi đến showroom. Nhân viên tư vấn sẽ liên hệ để xác nhận lịch lái thử.
                    </p>
                    <button
                      type="button"
                      onClick={() => setContactSubmittedRecord(null)}
                      className="px-5 py-2.5 rounded-full text-xs font-medium bg-[#11151C] text-white cursor-pointer"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Họ và Tên Quý Khách *
                        </label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, name: e.target.value })
                          }
                          placeholder="Nguyễn Minh Quân"
                          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-[#0078D6]"
                        />
                        {contactErrors.name && (
                          <p className="text-xs text-red-500 mt-1">{contactErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Số Điện Thoại *
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, phone: e.target.value })
                          }
                          placeholder="0901 234 567"
                          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-[#0078D6]"
                        />
                        {contactErrors.phone && (
                          <p className="text-xs text-red-500 mt-1">{contactErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Email (Tùy chọn)
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, email: e.target.value })
                          }
                          placeholder="quan.nguyen@company.vn"
                          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-[#0078D6]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Mẫu Xe BMW Quan Tâm
                        </label>
                        <select
                          value={contactForm.vehicleModel}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, vehicleModel: e.target.value })
                          }
                          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-[#0078D6]"
                        >
                          {BAVARIA_VEHICLES.map((v) => (
                            <option key={v.id} value={v.name}>
                              {v.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Nội Dung Cần Tư Vấn
                      </label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, message: e.target.value })
                        }
                        placeholder="Nhập yêu cầu tư vấn cấu hình xe, lịch hẹn lái thử hoặc phương án tài chính..."
                        className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-[#0078D6] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-[#0078D6] hover:bg-[#0062B0] cursor-pointer"
                    >
                      {contactSubmitting ? 'Đang Gửi...' : 'Gửi Yêu Cầu Đến Showroom'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-black text-white pt-12 pb-14 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center">
                ↑
              </span>
              <span className="text-[11px] uppercase tracking-widest">Lên trên</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#11151C] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <h4 className="text-base font-semibold text-white">
                BAVARIA MOTOR HOUSE • PRIVATE CONCIERGE
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Đăng ký lịch hẹn trải nghiệm lái thử hoặc nhận tư vấn trực tiếp từ chuyên gia sản phẩm BMW thông qua hệ thống quản trị khách hàng tự động AutoLead Systems.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                handleOpenBookingModal({
                  vehicleModel: BAVARIA_VEHICLES[0].name,
                  leadSource: 'website_booking'
                })
              }
              className="px-7 py-3 rounded-full text-xs font-medium text-white border border-white/40 hover:bg-white hover:text-black transition-colors shrink-0 cursor-pointer"
            >
              Đặt lịch hẹn ngay
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-4 border-t border-white/10 text-xs">
            <div className="space-y-3">
              <div className="font-semibold text-white">Các dòng xe</div>
              <ul className="space-y-2 text-white/65">
                <li>
                  <button
                    type="button"
                    onClick={() => handleExploreCategory('Luxury Sedan')}
                    className="hover:text-white cursor-pointer"
                  >
                    Luxury Sedan (7 Series / 5 Series)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleExploreCategory('Premium SUV')}
                    className="hover:text-white cursor-pointer"
                  >
                    SUV / SAV (BMW X7 / BMW X5)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleExploreCategory('High Performance')}
                    className="hover:text-white cursor-pointer"
                  >
                    BMW M GmbH (M4 / M3)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleExploreCategory('Grand Touring')}
                    className="hover:text-white cursor-pointer"
                  >
                    Grand Touring (8 Series / Z4)
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-white">Mua xe</div>
              <ul className="space-y-2 text-white/65">
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('collection')}
                    className="hover:text-white cursor-pointer"
                  >
                    Tìm xe mới có sẵn
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCondition('Pre-owned');
                      setActivePage('collection');
                    }}
                    className="hover:text-white cursor-pointer"
                  >
                    Xe lướt tuyển chọn
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenBookingModal({
                        vehicleModel: BAVARIA_VEHICLES[0].name,
                        leadSource: 'website_booking'
                      })
                    }
                    className="hover:text-white cursor-pointer"
                  >
                    Đăng ký lái thử
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-white">Tư vấn mua xe</div>
              <ul className="space-y-2 text-white/65">
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setConciergePrompt({
                        id: Date.now(),
                        text: 'So sánh BMW X5 và BMW X7'
                      })
                    }
                    className="hover:text-white cursor-pointer"
                  >
                    Trợ lý AI BMW Concierge
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('services')}
                    className="hover:text-white cursor-pointer"
                  >
                    Tư vấn tài chính doanh nghiệp
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('services')}
                    className="hover:text-white cursor-pointer"
                  >
                    Thu cũ đổi mới minh bạch
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-white">Dịch vụ</div>
              <ul className="space-y-2 text-white/65">
                {BAVARIA_SERVICES.slice(0, 4).map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActivePage('services')}
                      className="hover:text-white text-left cursor-pointer"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-white">Về chúng tôi</div>
              <ul className="space-y-2 text-white/65">
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('about')}
                    className="hover:text-white cursor-pointer"
                  >
                    Câu chuyện Bavaria Motor House
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('contact')}
                    className="hover:text-white cursor-pointer"
                  >
                    Liên hệ & Địa chỉ Salon
                  </button>
                </li>
                <li>
                  <a
                    href="http://localhost:5173/#crm"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#60A5FA] hover:text-white cursor-pointer"
                  >
                    Hệ thống AutoLead CRM ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-white/45 leading-relaxed">
            <p className="max-w-3xl">
              * Lưu ý minh bạch: Bavaria Motor House là không gian trưng bày và tư vấn xe BMW cao cấp hoạt động độc lập (Independent Premium BMW Showroom), không phải đại lý ủy quyền chính hãng của BMW AG. Các mức giá và thông số trên website là dữ liệu tham khảo tiêu chuẩn phục vụ mục đích trình diễn hệ thống AutoLead Systems.
            </p>
            <p className="shrink-0">© {new Date().getFullYear()} BAVARIA MOTOR HOUSE.</p>
          </div>
        </div>
      </footer>

      {/* MODAL & CONCIERGE */}
      <BavariaBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialVehicleModel={bookingModalConfig.vehicleModel}
        leadSource={bookingModalConfig.leadSource}
        conversationSummary={bookingModalConfig.conversationSummary}
      />

      <BmwConcierge
        onTriggerBooking={({ vehicleModel, leadSource, conversationSummary }) =>
          handleOpenBookingModal({
            vehicleModel,
            leadSource,
            conversationSummary
          })
        }
        onViewVehicleDetail={(vehicle) => handleOpenVehicleDetail(vehicle)}
        externalPromptRequest={conciergePrompt}
        onClearExternalPrompt={() => setConciergePrompt(null)}
      />
    </div>
  );
}
