import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Calendar,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { BAVARIA_VEHICLES } from '../data/bavariaVehicles';

const SUGGESTED_QUESTIONS = [
  'Tư vấn mẫu BMW phù hợp cho gia đình',
  'So sánh BMW X5 và BMW X7',
  'Tư vấn sedan hạng sang cho doanh nhân',
  'Gợi ý dòng BMW thể thao hiệu năng cao',
  'Đặt lịch lái thử BMW tại showroom'
];

function buildConciergeReply(rawQuery) {
  const q = rawQuery.toLowerCase().trim();

  const v750e = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-750e-g70');
  const vi7 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-i7-xdrive60-g70');
  const vx7 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-x7-g07-lci');
  const vx5 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-x5-g05-lci');
  const v530i = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-530i-g60');
  const v840i = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-840i-gc-g16');
  const vm4 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-m4-comp-g82');
  const vm3 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-m3-comp-g80');
  const vz4 = BAVARIA_VEHICLES.find((v) => v.id === 'bmw-z4-m40i-g29');

  if (
    (q.includes('x5') && q.includes('x7')) ||
    (q.includes('so sánh') && (q.includes('suv') || q.includes('gầm cao')))
  ) {
    return {
      text: `Tại **Bavaria Motor House**, cả **${vx5.shortName}** và **${vx7.shortName}** đều sử dụng động cơ 3.0L I6 TwinPower Turbo kết hợp Mild-Hybrid 48V (381 HP / 540 Nm) và hệ dẫn động xDrive, nhưng hướng đến hai nhu cầu sử dụng khác biệt:\n\n• **${vx5.name}** (*${vx5.priceFormatted}*): Cấu hình **5 chỗ**, kích thước linh hoạt trong phố, tăng tốc 0–100 km/h trong 5,4 giây — lý tưởng nếu Quý khách yêu thích tự cầm lái hàng ngày.\n• **${vx7.name}** (*${vx7.priceFormatted}*): Cấu hình **7 chỗ Full-Size** với 3 hàng ghế rộng rãi, hệ thống treo khí nén 2 trục êm ái và cụm đèn pha lê Swarovski Iconic Glow — hoàn hảo cho gia đình đa thế hệ hoặc di chuyển đường dài.`,
      recommendedModels: [vx7, vx5],
      summaryContext:
        'Khách hàng đã so sánh chi tiết giữa BMW X5 (G05 LCI) và BMW X7 (G07 LCI) qua BMW CONCIERGE.'
    };
  }

  if (
    (q.includes('5 series') || q.includes('530i')) &&
    (q.includes('7 series') || q.includes('750e') || q.includes('i7'))
  ) {
    return {
      text: `Dưới đây là điểm khác biệt cốt lõi giữa hai dòng sedan doanh nhân tại salon:\n\n• **${v530i.name}** (*${v530i.priceFormatted}*): Thế hệ G60 hoàn toàn mới, động cơ 2.0L Mild-Hybrid (258 HP), dẫn động cầu sau RWD lanh lẹ, phù hợp với doanh nhân trẻ thường xuyên tự cầm lái.\n• **${v750e.name}** (*${v750e.priceFormatted}*): Sedan đầu bảng G70, truyền động Plug-in Hybrid 489 HP, treo khí nén 2 trục, cửa đóng/mở tự động và hàng ghế thương gia **Executive Lounge** — chuẩn mực dành cho Chủ tịch và ngoại giao cấp cao.`,
      recommendedModels: [v750e, v530i],
      summaryContext:
        'Khách hàng đã đối chiếu giữa BMW 530i M Sport (G60) và BMW 750e xDrive (G70) qua BMW CONCIERGE.'
    };
  }

  if (
    q.includes('gia đình') ||
    q.includes('7 chỗ') ||
    q.includes('suv') ||
    q.includes('gầm cao') ||
    q.includes('x7') ||
    q.includes('x5')
  ) {
    const primary = q.includes('x5') && !q.includes('x7') ? vx5 : vx7;
    const secondary = primary.id === vx7.id ? vx5 : vx7;
    return {
      text: `Với nhu cầu phục vụ **gia đình cao cấp** và những chuyến hành trình dài, **BMW CONCIERGE** trân trọng đề xuất 2 mẫu SAV đang trưng bày tại Bavaria Motor House:\n\n1. **${primary.name}** — Giá tham khảo: **${primary.priceFormatted}**\n   • Cấu hình: ${primary.seatingCapacity} | Động cơ: ${primary.engine}\n   • Điểm nổi bật: ${primary.summary}\n\n2. **${secondary.name}** — Giá tham khảo: **${secondary.priceFormatted}**\n   • Cấu hình: ${secondary.seatingCapacity} | Động cơ: ${secondary.engine}\n\nQuý khách có thể đặt lịch trải nghiệm thực tế hàng ghế và cảm giác lái ngay tại salon.`,
      recommendedModels: [primary, secondary],
      summaryContext: `Khách hàng quan tâm dòng SUV gia đình (${primary.shortName} & ${secondary.shortName}) qua BMW CONCIERGE.`
    };
  }

  if (
    q.includes('doanh nhân') ||
    q.includes('chủ tịch') ||
    q.includes('sedan') ||
    q.includes('7 series') ||
    q.includes('750e') ||
    q.includes('i7') ||
    q.includes('điện') ||
    q.includes('5 series') ||
    q.includes('530i') ||
    q.includes('8 series') ||
    q.includes('840i')
  ) {
    if (q.includes('i7') || q.includes('thuần điện') || q.includes('xe điện')) {
      return {
        text: `**${vi7.name}** (*${vi7.priceFormatted}*) là mẫu sedan hạng sang đầu bảng thuần điện tại Bavaria Motor House:\n\n• **Hệ truyền động**: ${vi7.engine}\n• **Tăng tốc 0–100 km/h**: ${vi7.acceleration} | **Quãng đường**: ${vi7.fuelConsumption}\n• **Không gian**: Khoang thương gia Executive Lounge kết hợp âm thanh Bowers & Wilkins và hiệu ứng âm thanh Hans Zimmer IconicSounds.\n\nQuý khách có muốn đặt lịch trải nghiệm sự tĩnh lặng tuyệt đối của **BMW i7** tại showroom không?`,
        recommendedModels: [vi7, v750e],
        summaryContext: `Khách hàng tìm hiểu chuyên sâu về mẫu sedan thuần điện đầu bảng ${vi7.name}.`
      };
    }

    return {
      text: `Dành cho **doanh nhân & lãnh đạo**, Bavaria Motor House hiện trưng bày bộ ba sedan hạng sang tiêu biểu của BMW:\n\n• **${v750e.name}** (*${v750e.priceFormatted}*): Flagship G70 Plug-in Hybrid 489 HP, ghế thương gia Executive Lounge và đèn pha lê Swarovski.\n• **${vi7.name}** (*${vi7.priceFormatted}*): Đỉnh cao sedan thuần điện 544 HP, vận hành siêu tĩnh lặng, phạm vi 590–625 km.\n• **${v530i.name}** (*${v530i.priceFormatted}*): Sedan doanh nhân thế hệ mới G60 năng động, trang bị BMW Interaction Bar và gói M Sport.`,
      recommendedModels: [v750e, v530i, vi7],
      summaryContext:
        'Khách hàng được tư vấn các dòng Sedan hạng sang cho doanh nhân (BMW 750e G70, BMW 530i G60, BMW i7).'
    };
  }

  if (
    q.includes('thể thao') ||
    q.includes('hiệu năng') ||
    q.includes('m3') ||
    q.includes('m4') ||
    q.includes('z4') ||
    q.includes('mui trần') ||
    q.includes('coupé') ||
    q.includes('coupe') ||
    q.includes('tốc độ')
  ) {
    return {
      text: `Nếu Quý khách tìm kiếm **DNA đua xe thuần khiết từ phân nhánh BMW M GmbH**, Bavaria Motor House hiện sở hữu hai tuyệt tác trang bị khối động cơ **S58 3.0L M TwinPower Turbo (510 HP / 650 Nm)**, tăng tốc 0–100 km/h chỉ trong **3,9 giây**:\n\n• **${vm4.name}** (*${vm4.priceFormatted}*): Thiết kế Coupé 2 cửa cơ bắp, mui sợi carbon CFRP trần, trưng bày mới 100%.\n• **${vm3.name}** (*${vm3.priceFormatted}*): Huyền thoại M Sedan 4 cửa 5 chỗ thực dụng (${vm3.conditionLabel}).\n• Ngoài ra còn có **${vz4.name}** (*${vz4.priceFormatted}*) mui trần 340 HP cho những buổi dạo phố cuối tuần.`,
      recommendedModels: [vm4, vm3, vz4],
      summaryContext:
        'Khách hàng được tư vấn dòng xe hiệu năng cao BMW M4 Competition (G82) và BMW M3 Competition (G80).'
    };
  }

  return {
    text: `Chào mừng Quý khách đến với **BMW CONCIERGE** của **Bavaria Motor House**. Hiện tại salon đang trưng bày **8 tuyệt tác BMW** thuộc 4 phân khúc:\n\n• **Luxury Sedan**: ${v750e.shortName}, ${vi7.shortName}, ${v530i.shortName}\n• **Premium SUV**: ${vx7.shortName} (7 chỗ), ${vx5.shortName} (5 chỗ)\n• **Grand Touring**: ${v840i.shortName}, ${vz4.shortName}\n• **High Performance**: ${vm4.shortName}, ${vm3.shortName}\n\nQuý khách có thể hỏi chi tiết về từng dòng xe, yêu cầu so sánh thông số hoặc nhấn nút bên dưới để **đặt lịch lái thử** trực tiếp cùng chuyên gia sản phẩm của chúng tôi.`,
    recommendedModels: [v750e, vx7, vm4],
    summaryContext:
      'Khách hàng trao đổi cùng trợ lý BMW CONCIERGE để tìm hiểu danh mục xe và đặt lịch lái thử tại Bavaria Motor House.'
  };
}

export default function BmwConcierge({
  onTriggerBooking,
  onViewVehicleDetail,
  externalPromptRequest,
  onClearExternalPrompt
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: 'Kính chào Quý khách đến với **BAVARIA MOTOR HOUSE**. Tôi là **BMW CONCIERGE** — Trợ lý tư vấn chuyên biệt của salon.\n\nTôi có thể hỗ trợ Quý khách đối chiếu thông số kỹ thuật, lựa chọn mẫu BMW theo phong cách di chuyển hoặc sắp xếp lịch hẹn lái thử riêng tư.',
      recommendedModels: [BAVARIA_VEHICLES[0], BAVARIA_VEHICLES[1]]
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (externalPromptRequest && externalPromptRequest.text) {
      setIsOpen(true);
      handleSendQuery(externalPromptRequest.text);
      if (onClearExternalPrompt) {
        onClearExternalPrompt();
      }
    }
  }, [externalPromptRequest]);

  const handleSendQuery = (queryText) => {
    const trimmed = (queryText || inputValue).trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = buildConciergeReply(trimmed);
      const botMsg = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: reply.text,
        recommendedModels: reply.recommendedModels || [],
        summaryContext: reply.summaryContext
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: 'Cuộc trò chuyện đã được làm mới. Quý khách cần **BMW CONCIERGE** tư vấn dòng Sedan, SUV hay dòng hiệu năng cao BMW M hôm nay?',
        recommendedModels: [BAVARIA_VEHICLES[0], BAVARIA_VEHICLES[1]]
      }
    ]);
  };

  const renderFormattedText = (text) => {
    return text.split('\n').map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lineIdx} className={lineIdx > 0 ? 'mt-2' : ''}>
          {parts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={idx} className="font-semibold text-[#F4F5F6]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={idx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-[80]">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 px-5 py-3.5 rounded-full border border-white/20 shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            style={{
              backgroundColor: '#0B0D10',
              color: '#F4F5F6',
              boxShadow: '0 14px 34px -8px rgba(0, 0, 0, 0.85), 0 0 20px -4px rgba(0, 120, 214, 0.45)'
            }}
            aria-label="Mở trợ lý BMW CONCIERGE"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center border shrink-0"
              style={{
                backgroundColor: 'rgba(0, 120, 214, 0.2)',
                borderColor: '#0078D6',
                color: '#93C5FD'
              }}
            >
              <Sparkles className="w-4 h-4 text-[#0078D6]" />
            </div>
            <div className="text-left pr-1">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#929BA6] leading-tight">
                AI SALES ADVISORY
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-[0.14em] text-[#F4F5F6]">
                BMW CONCIERGE
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-[85] w-[calc(100vw-24px)] sm:w-[430px] max-h-[82vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
          style={{
            backgroundColor: '#15191F',
            borderColor: '#303740',
            color: '#F4F5F6',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.92)'
          }}
          role="dialog"
          aria-label="Trợ lý tư vấn BMW CONCIERGE"
        >
          <div
            className="h-1 w-full shrink-0"
            style={{
              background: 'linear-gradient(90deg, #0078D6 0%, #60A5FA 50%, #15191F 100%)'
            }}
          />

          <div
            className="flex items-center justify-between px-4 py-3.5 border-b shrink-0"
            style={{ backgroundColor: '#0B0D10', borderColor: '#303740' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: 'rgba(0, 120, 214, 0.18)',
                  borderColor: '#0078D6',
                  color: '#93C5FD'
                }}
              >
                <Sparkles className="w-4 h-4 text-[#0078D6]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F4F5F6]">
                    BMW CONCIERGE
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] text-[#929BA6] block">
                  Cố vấn kỹ thuật & Đặt lịch lái thử Bavaria Motor House
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Làm mới hội thoại"
                className="p-2 text-[#929BA6] hover:text-[#F4F5F6] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Đóng BMW CONCIERGE"
                className="p-2 text-[#929BA6] hover:text-[#F4F5F6] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-[13px] leading-relaxed"
            style={{ backgroundColor: '#0B0D10' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className="max-w-[90%] px-3.5 py-3 rounded-xl border"
                  style={
                    msg.role === 'user'
                      ? {
                          backgroundColor: '#0078D6',
                          borderColor: '#3B82F6',
                          color: '#F4F5F6'
                        }
                      : {
                          backgroundColor: '#1C222A',
                          borderColor: '#303740',
                          color: '#D8DEE6'
                        }
                  }
                >
                  {renderFormattedText(msg.text)}
                </div>

                {msg.role === 'assistant' &&
                  Array.isArray(msg.recommendedModels) &&
                  msg.recommendedModels.length > 0 && (
                    <div className="w-full max-w-[92%] mt-2.5 space-y-2">
                      {msg.recommendedModels.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className="p-2.5 border rounded-xl transition-colors"
                          style={{
                            backgroundColor: '#15191F',
                            borderColor: '#303740'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={vehicle.images.main}
                              alt={vehicle.name}
                              className="w-16 h-11 object-cover rounded-lg border border-[#303740] shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] uppercase tracking-wider text-[#929BA6]">
                                {vehicle.category} • {vehicle.condition === 'New' ? 'Xe Mới' : 'Xe Lướt'}
                              </div>
                              <div className="text-xs font-medium text-[#F4F5F6] truncate">
                                {vehicle.name}
                              </div>
                              <div className="text-[11px] text-[#93C5FD] font-semibold">
                                {vehicle.priceFormatted}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-2.5 pt-2 border-t border-[#303740]">
                            <button
                              type="button"
                              onClick={() =>
                                onTriggerBooking({
                                  vehicleModel: vehicle.name,
                                  leadSource: 'ai_assistant',
                                  conversationSummary:
                                    msg.summaryContext ||
                                    `Khách hàng được BMW CONCIERGE tư vấn và chọn đặt lịch lái thử mẫu ${vehicle.name}.`
                                })
                              }
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[11px] uppercase tracking-wider font-semibold text-white bg-[#0078D6] hover:bg-[#0062B0] transition-colors cursor-pointer"
                            >
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              <span>ĐẶT LỊCH LÁI THỬ {vehicle.shortName.toUpperCase()}</span>
                            </button>

                            {onViewVehicleDetail && (
                              <button
                                type="button"
                                onClick={() => onViewVehicleDetail(vehicle)}
                                className="px-2.5 py-2 rounded-full text-[11px] uppercase tracking-wider text-[#929BA6] hover:text-[#F4F5F6] border border-[#303740] transition-colors inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>Chi tiết</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#929BA6] px-3 py-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0078D6] animate-pulse" />
                <span>BMW Concierge đang phân tích dữ liệu xe tại salon...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            className="px-3.5 py-2.5 border-t overflow-x-auto flex items-center gap-2 shrink-0"
            style={{ backgroundColor: '#15191F', borderColor: '#303740' }}
          >
            {SUGGESTED_QUESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSendQuery(suggestion)}
                className="shrink-0 px-3 py-1.5 rounded-full text-[11px] border transition-colors whitespace-nowrap cursor-pointer"
                style={{
                  backgroundColor: '#0B0D10',
                  borderColor: '#303740',
                  color: '#929BA6'
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2 p-3 border-t shrink-0"
            style={{ backgroundColor: '#0B0D10', borderColor: '#303740' }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Hỏi về BMW 7 Series, X7, M4 hoặc đặt lịch lái thử..."
              className="flex-1 px-3.5 py-2.5 rounded-full text-xs sm:text-sm border focus:outline-none focus:border-[#0078D6]"
              style={{
                backgroundColor: '#15191F',
                borderColor: '#303740',
                color: '#F4F5F6'
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-full text-white bg-[#0078D6] hover:bg-[#0062B0] disabled:opacity-40 transition-all shrink-0 cursor-pointer"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
