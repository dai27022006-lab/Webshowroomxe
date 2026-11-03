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
  '🚗 Tư vấn xe BMW phù hợp cho gia đình',
  '💳 Chính sách trả góp & Lãi suất vay',
  '🛡️ Gói bảo hành 5 năm & Bảo dưỡng BSI',
  '⏱️ Thời gian giao xe & Xe có sẵn giao ngay',
  '📝 Thủ tục đăng ký lái thử tận nơi',
  '⚖️ So sánh BMW X5 và BMW X7',
  '👔 Sedan doanh nhân: 5 Series & 7 Series',
  '⚡ Tìm hiểu xe thuần điện BMW i7',
  '🏁 Dòng thể thao hiệu năng cao M3 & M4',
  '💰 Chi phí lăn bánh & Ưu đãi trước bạ',
  '🎯 Tư vấn chọn xe theo mức ngân sách'
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

  // 1. Trả góp & Hỗ trợ tài chính / Ngân hàng / Lãi suất
  if (
    q.includes('trả góp') ||
    q.includes('vay') ||
    q.includes('ngân hàng') ||
    q.includes('lãi suất') ||
    q.includes('tài chính') ||
    q.includes('hồ sơ vay') ||
    q.includes('bảng tính')
  ) {
    return {
      text: `**CHÍNH SÁCH MUA XE TRẢ GÓP & TÀI CHÍNH TẠI BAVARIA MOTOR HOUSE:**\n\n• **Tỷ lệ tài trợ**: Hỗ trợ vay lên đến **80% – 85%** giá trị xe đối với khách hàng cá nhân và doanh nghiệp.\n• **Vốn đối ứng ban đầu**: Quý khách chỉ cần chuẩn bị trước từ **15% – 20%** (Ví dụ: **BMW 530i** trả trước từ ~520 triệu VNĐ, **BMW X5** trả trước từ ~830 triệu VNĐ).\n• **Lãi suất ưu đãi**: Gói liên kết đặc quyền độc quyền với Vietcombank, Techcombank, Shinhan Bank... chỉ từ **6.9% – 7.5%/năm** cố định.\n• **Thời hạn vay linh hoạt**: Từ **1 đến 8 năm** (12 – 96 tháng) với phương thức trả nợ gốc giảm dần linh hoạt.\n• **Duyệt hồ sơ siêu tốc**: Phê duyệt hồ sơ trong **24 giờ**, hỗ trợ xử lý toàn bộ giấy tờ chứng minh thu nhập tận nơi.\n\nQuý khách hãy nhấn **Đặt lịch lái thử** bên dưới để nhận bảng dự toán dòng tiền trả góp chi tiết theo tháng!`,
      recommendedModels: [v530i, vx5],
      summaryContext:
        'Khách hàng quan tâm chính sách vay trả góp ngân hàng và phương án tài chính qua BMW CONCIERGE.'
    };
  }

  // 2. Bảo hành chính hãng & Gói bảo dưỡng BSI (BMW Service Inclusive)
  if (
    q.includes('bảo hành') ||
    q.includes('bảo dưỡng') ||
    q.includes('bsi') ||
    q.includes('bảo trì') ||
    q.includes('phụ tùng') ||
    q.includes('dịch vụ bảo') ||
    q.includes('chăm sóc xe') ||
    q.includes('cứu hộ')
  ) {
    return {
      text: `**CHÍNH SÁCH BẢO HÀNH & GÓI BẢO DƯỠNG ĐẶC QUYỀN (BMW SERVICE INCLUSIVE - BSI):**\n\n• **Chính sách bảo hành tiêu chuẩn**: **5 năm không giới hạn số km** cho toàn bộ xe xuất xưởng từ Bavaria Motor House.\n• **Gói bảo dưỡng định kỳ BSI**: Miễn phí trọn gói bảo dưỡng trong **5 năm hoặc 60.000 km**, bao gồm thay dầu động cơ chính hãng BMW TwinPower Turbo, cốc lọc nhớt, lọc gió điều hòa microfilter, bugi đánh lửa, thay dầu phanh định kỳ và kiểm tra an toàn toàn diện.\n• **Tiêu chuẩn kỹ thuật 111 điểm**: Mọi phương tiện đều vượt qua 111 hạng mục kiểm tra cơ điện tử khắt khe trước khi bàn giao.\n• **Cứu hộ khẩn cấp BMW Roadside Assistance**: Hỗ trợ di động 24/7 trên toàn lãnh thổ Việt Nam suốt thời hạn bảo hành.`,
      recommendedModels: [vx5, v750e],
      summaryContext:
        'Khách hàng tìm hiểu chế độ bảo hành 5 năm và gói bảo dưỡng định kỳ BSI qua BMW CONCIERGE.'
    };
  }

  // 3. Thời gian giao xe & Tình trạng xe có sẵn
  if (
    q.includes('giao xe') ||
    q.includes('có sẵn') ||
    q.includes('sẵn xe') ||
    q.includes('nhận xe') ||
    q.includes('khi nào có') ||
    q.includes('giao ngay') ||
    q.includes('thời gian đặt')
  ) {
    return {
      text: `**TÌNH TRẠNG XE CÓ SẴN & THỜI GIAN BÀN GIAO TẠI SALON:**\n\n• **Xe có sẵn giao ngay (trong 3 – 5 ngày làm việc)**:\n  - **${vx5.name}**: Sẵn sàng màu Trắng Mineral White & Đen Carbon Black.\n  - **${v530i.name}**: Sẵn sàng màu Xám Brooklyn Grey & Xanh Phytonic Blue.\n  - **${vx7.name}**: Sẵn sàng giao ngay phiên bản 7 chỗ Full-Size.\n• **Xe cá nhân hóa BMW Individual & Dòng M Performance**:\n  - **${vm4.name}**, **${v750e.name}**, **${vi7.name}**: Thời gian hoàn thiện thủ tục bấm biển và chuẩn bị xe từ **10 – 20 ngày**.\n• **Đặc quyền bàn giao VIP**: Hỗ trợ bấm biển số trọn gói trong ngày và tổ chức lễ bàn giao riêng tư (VIP Delivery Ceremony) tại salon hoặc vận chuyển xe bằng xe lồng kín về tận tư gia của Quý khách.`,
      recommendedModels: [vx5, vx7, v530i],
      summaryContext:
        'Khách hàng kiểm tra danh sách xe có sẵn giao ngay và thời gian bàn giao xe tại salon.'
    };
  }

  // 4. Chi phí lăn bánh & Biểu phí trước bạ / Ưu đãi
  if (
    q.includes('lăn bánh') ||
    q.includes('ra biển') ||
    q.includes('trước bạ') ||
    q.includes('biển số') ||
    q.includes('khuyến mãi') ||
    q.includes('ưu đãi') ||
    q.includes('tổng chi phí')
  ) {
    return {
      text: `**DỰ TOÁN CHI PHÍ LĂN BÁNH XE BMW TẠI VIỆT NAM:**\n\nChi phí lăn bánh hoàn thiện một mẫu xe BMW bao gồm:\n1. **Giá bán niêm yết** (đã bao gồm VAT 10%).\n2. **Lệ phí trước bạ**: 10% (TP.HCM, tỉnh) hoặc 12% (Hà Nội).\n3. ⭐ **ĐẶC BIỆT DÀNH CHO XE THUẦN ĐIỆN (${vi7.shortName})**: Được **MIỄN 100% LỆ PHÍ TRƯỚC BẠ** theo chính sách của Chính Phủ — Quý khách tiết kiệm trực tiếp hơn **720.000.000 – 860.000.000 VNĐ** tiền mặt!\n4. **Phí biển số**: 20.000.000 VNĐ (HN & TP.HCM) hoặc 1.000.000 VNĐ (các tỉnh).\n5. **Bảo hiểm & Phí đường bộ**: Phí bảo trì đường bộ (1.560.000 VNĐ/năm), bảo hiểm TNDS và bảo hiểm vật chất thân xe chính hãng (1.1% – 1.3%).\n\nQuý khách hãy nhấn **Đặt lịch lái thử** bên dưới để nhận file báo giá lăn bánh chi tiết cho tỉnh/thành phố của mình!`,
      recommendedModels: [vi7, v530i, vx5],
      summaryContext:
        'Khách hàng yêu cầu bảng dự toán chi phí lăn bánh và ưu đãi thuế trước bạ qua BMW CONCIERGE.'
    };
  }

  // 5. Tư vấn theo ngân sách đầu tư
  if (
    q.includes('ngân sách') ||
    q.includes('dưới 4') ||
    q.includes('4 đến') ||
    q.includes('4-6') ||
    q.includes('trên 6') ||
    q.includes('tầm tiền') ||
    q.includes('khoảng tiền') ||
    q.includes('bao nhiêu tiền')
  ) {
    return {
      text: `**GỢI Ý MẪU XE BMW PHÙ HỢP THEO MỨC NGÂN SÁCH ĐẦU TƯ:**\n\n• **Dưới 4 Tỷ VNĐ**:\n  - **${v530i.name}** (*${v530i.priceFormatted}*): Sedan doanh nhân thế hệ mới G60, khoang lái kỹ thuật số Curved Display.\n  - **${vz4.name}** (*${vz4.priceFormatted}*): Mui trần thể thao cá tính 340 HP.\n\n• **Từ 4 Tỷ – 6 Tỷ VNĐ**:\n  - **${vx5.name}** (*${vx5.priceFormatted}*): SAV 5 chỗ gia đình đầm chắc, động cơ Mild-Hybrid 381 HP.\n  - **${vx7.name}** (*${vx7.priceFormatted}*): Flagship SAV 7 chỗ Full-Size siêu êm ái.\n  - **${vm3.name}** (*${vm3.priceFormatted}*): Sedan hiệu năng cao 510 HP thuần chất đua xe.\n  - **${v840i.name}** (*${v840i.priceFormatted}*): Gran Coupé 4 cửa quyến rũ.\n\n• **Trên 6 Tỷ VNĐ**:\n  - **${v750e.name}** (*${v750e.priceFormatted}*): Sedan Plug-in Hybrid thượng lưu dành cho Chủ tịch.\n  - **${vi7.name}** (*${vi7.priceFormatted}*): Đỉnh cao sedan thuần điện 544 HP siêu tĩnh lặng.\n  - **${vm4.name}** (*${vm4.priceFormatted}*): Siêu phẩm Coupé hiệu năng cao M Power.`,
      recommendedModels: [v530i, vx5, v750e],
      summaryContext:
        'Khách hàng được tư vấn danh mục xe BMW phù hợp theo các khung ngân sách đầu tư.'
    };
  }

  // 6. Thủ tục đăng ký lái thử / Lái thử tận nhà
  if (
    (q.includes('lái thử') || q.includes('test drive') || q.includes('chạy thử')) &&
    !q.includes('x5') &&
    !q.includes('x7')
  ) {
    return {
      text: `**DỊCH VỤ ĐĂNG KÝ LÁI THỬ CAO CẤP TẠI BAVARIA MOTOR HOUSE:**\n\n• **100% Miễn phí & Độc quyền**: Quý khách có thể lựa chọn trải nghiệm trực tiếp tại **Showroom** hoặc yêu cầu chuyên viên đưa xe đến tận **Nhà riêng / Cơ quan**.\n• **Thủ tục đơn giản**: Quý khách chỉ cần chuẩn bị **Giấy phép lái xe (GPLX) hạng B1 hoặc B2** còn hạn sử dụng.\n• **Đội ngũ chuyên viên hỗ trợ**: Mỗi buổi lái thử đều có Chuyên gia sản phẩm (BMW Product Genius) đồng hành hướng dẫn chi tiết các tính năng như Cruise Control thông minh, hỗ trợ lùi xe tự động Reversing Assistant và chế độ Sport Boost.\n• **Chuẩn bị chu đáo**: Xe lái thử luôn được kiểm định an toàn, vệ sinh khử khuẩn và phục vụ nước uống cao cấp.\n\nQuý khách vui lòng chọn mẫu xe mong muốn bên dưới và nhấn **Đặt lịch lái thử** để đặt giờ hẹn phù hợp nhất!`,
      recommendedModels: [vx5, v750e, vm4],
      summaryContext:
        'Khách hàng tìm hiểu quy trình và yêu cầu đặt lịch lái thử xe BMW tận nơi.'
    };
  }

  // 7. So sánh X5 và X7
  if (
    (q.includes('x5') && q.includes('x7')) ||
    (q.includes('so sánh') && (q.includes('suv') || q.includes('gầm cao') || q.includes('sav')))
  ) {
    return {
      text: `Tại **Bavaria Motor House**, cả **${vx5.shortName}** và **${vx7.shortName}** đều sử dụng động cơ 3.0L I6 TwinPower Turbo kết hợp Mild-Hybrid 48V (381 HP / 540 Nm) và hệ dẫn động 4 bánh toàn thời gian xDrive, nhưng hướng đến hai phong cách sử dụng riêng biệt:\n\n• **${vx5.name}** (*${vx5.priceFormatted}*): Cấu hình **5 chỗ**, kích thước linh hoạt trong phố, tăng tốc 0–100 km/h trong 5,4 giây — lý tưởng nếu Quý khách yêu thích tự cầm lái hàng ngày và những chuyến dã ngoại cuối tuần.\n• **${vx7.name}** (*${vx7.priceFormatted}*): Cấu hình **7 chỗ Full-Size** với 3 hàng ghế rộng rãi cho người lớn, hệ thống treo khí nén 2 trục êm ái tuyệt đối, cửa sổ trời Panorama Sky Lounge 15.000 điểm sáng và cụm đèn pha lê Swarovski Iconic Glow — hoàn hảo cho gia đình đa thế hệ hoặc di chuyển đường dài cùng đối tác.`,
      recommendedModels: [vx7, vx5],
      summaryContext:
        'Khách hàng đã so sánh chi tiết giữa BMW X5 (G05 LCI) và BMW X7 (G07 LCI) qua BMW CONCIERGE.'
    };
  }

  // 8. Đối chiếu 5 Series vs 7 Series
  if (
    (q.includes('5 series') || q.includes('530i')) &&
    (q.includes('7 series') || q.includes('750e'))
  ) {
    return {
      text: `Dưới đây là điểm khác biệt cốt lõi giữa hai dòng sedan doanh nhân tiêu biểu tại salon:\n\n• **${v530i.name}** (*${v530i.priceFormatted}*): Thế hệ G60 hoàn toàn mới, động cơ 2.0L Mild-Hybrid (258 HP), dẫn động cầu sau RWD lanh lẹ, khoang lái số BMW Curved Display kết hợp thanh tương tác Interaction Bar — phù hợp với doanh nhân trẻ năng động thường xuyên tự cầm lái.\n• **${v750e.name}** (*${v750e.priceFormatted}*): Sedan đầu bảng G70, truyền động Plug-in Hybrid 489 HP, treo khí nén 2 trục, cửa đóng/mở tự động, màn hình rạp chiếu Theater Screen 31.3 inch 8K và hàng ghế thương gia **Executive Lounge** — chuẩn mực tối thượng dành cho Chủ tịch và lãnh đạo cấp cao.`,
      recommendedModels: [v750e, v530i],
      summaryContext:
        'Khách hàng đã đối chiếu giữa BMW 530i M Sport (G60) và BMW 750e xDrive (G70) qua BMW CONCIERGE.'
    };
  }

  // 9. Xe thuần điện BMW i7
  if (q.includes('i7') || q.includes('thuần điện') || q.includes('xe điện') || q.includes('electric')) {
    return {
      text: `**${vi7.name}** (*${vi7.priceFormatted}*) là mẫu sedan hạng sang đầu bảng thuần điện biểu tượng của BMW tại Bavaria Motor House:\n\n• **Hệ truyền động**: 2 mô-tơ điện công suất cực đại **544 HP**, mô-men xoắn **745 Nm**, dẫn động 4 bánh xDrive.\n• **Vận hành**: Tăng tốc 0–100 km/h trong **4,7 giây** trong sự tĩnh lặng tuyệt đối.\n• **Dung lượng pin & Tầm vận hành**: Bộ pin 105.7 kWh cho tầm di chuyển lên tới **590 – 625 km** cho mỗi lần sạc đầy (chuẩn WLTP).\n• **Đặc quyền tài chính**: Được **MIỄN 100% lệ phí trước bạ** theo quy định nhà nước, tiết kiệm hơn 700 triệu VNĐ lăn bánh.\n• **Khoang thương gia**: Trang bị màn hình BMW Theater Screen 31.3 inch độ phân giải 8K gập từ trần xe kết hợp hệ thống âm thanh vòm 4D Bowers & Wilkins Diamond 36 loa.\n\nQuý khách hãy nhấn **Đặt lịch lái thử** bên dưới để trải nghiệm ngay mẫu sedan tương lai này!`,
      recommendedModels: [vi7, v750e],
      summaryContext: `Khách hàng tìm hiểu chuyên sâu về mẫu sedan thuần điện đầu bảng ${vi7.name}.`
    };
  }

  // 10. Xe gia đình (SUV / SAV 5 chỗ & 7 chỗ)
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
      text: `Với nhu cầu phục vụ **gia đình cao cấp** và những hành trình nghỉ dưỡng dài ngày, **BMW CONCIERGE** trân trọng đề xuất 2 mẫu SAV hàng đầu đang trưng bày tại Bavaria Motor House:\n\n1. **${primary.name}** — Giá tham khảo: **${primary.priceFormatted}**\n   • Cấu hình: ${primary.seatingCapacity} | Động cơ: ${primary.engine}\n   • Điểm nổi bật: ${primary.summary}\n\n2. **${secondary.name}** — Giá tham khảo: **${secondary.priceFormatted}**\n   • Cấu hình: ${secondary.seatingCapacity} | Động cơ: ${secondary.engine}\n\nQuý khách có thể đặt lịch trải nghiệm thực tế không gian các hàng ghế và cảm giác lái ngay tại salon hoặc tại nhà.`,
      recommendedModels: [primary, secondary],
      summaryContext: `Khách hàng quan tâm dòng SUV gia đình (${primary.shortName} & ${secondary.shortName}) qua BMW CONCIERGE.`
    };
  }

  // 11. Doanh nhân & Sedan
  if (
    q.includes('doanh nhân') ||
    q.includes('chủ tịch') ||
    q.includes('sedan') ||
    q.includes('7 series') ||
    q.includes('750e') ||
    q.includes('5 series') ||
    q.includes('530i') ||
    q.includes('8 series') ||
    q.includes('840i')
  ) {
    return {
      text: `Dành cho **doanh nhân & lãnh đạo**, Bavaria Motor House hiện trưng bày bộ ba sedan hạng sang tiêu biểu của BMW:\n\n• **${v750e.name}** (*${v750e.priceFormatted}*): Flagship G70 Plug-in Hybrid 489 HP, ghế thương gia Executive Lounge và đèn pha lê Swarovski.\n• **${vi7.name}** (*${vi7.priceFormatted}*): Đỉnh cao sedan thuần điện 544 HP, vận hành siêu tĩnh lặng, phạm vi 590–625 km, miễn 100% thuế trước bạ.\n• **${v530i.name}** (*${v530i.priceFormatted}*): Sedan doanh nhân thế hệ mới G60 năng động, trang bị BMW Interaction Bar và gói M Sport.`,
      recommendedModels: [v750e, v530i, vi7],
      summaryContext:
        'Khách hàng được tư vấn các dòng Sedan hạng sang cho doanh nhân (BMW 750e G70, BMW 530i G60, BMW i7).'
    };
  }

  // 12. Thể thao & Hiệu năng cao (M Series)
  if (
    q.includes('thể thao') ||
    q.includes('hiệu năng') ||
    q.includes('m3') ||
    q.includes('m4') ||
    q.includes('z4') ||
    q.includes('mui trần') ||
    q.includes('coupé') ||
    q.includes('coupe') ||
    q.includes('tốc độ') ||
    q.includes('m power')
  ) {
    return {
      text: `Nếu Quý khách tìm kiếm **DNA tốc độ thuần khiết từ phân nhánh BMW M GmbH**, Bavaria Motor House hiện sở hữu hai tuyệt tác trang bị khối động cơ **S58 3.0L M TwinPower Turbo (510 HP / 650 Nm)**, tăng tốc 0–100 km/h chỉ trong **3,9 giây**:\n\n• **${vm4.name}** (*${vm4.priceFormatted}*): Thiết kế Coupé 2 cửa cơ bắp, mui sợi carbon CFRP trần, trưng bày mới 100%.\n• **${vm3.name}** (*${vm3.priceFormatted}*): Huyền thoại M Sedan 4 cửa 5 chỗ thực dụng (${vm3.conditionLabel}).\n• Ngoài ra còn có **${vz4.name}** (*${vz4.priceFormatted}*) mui trần 340 HP cho những buổi dạo phố cuối tuần.`,
      recommendedModels: [vm4, vm3, vz4],
      summaryContext:
        'Khách hàng được tư vấn dòng xe hiệu năng cao BMW M4 Competition (G82) và BMW M3 Competition (G80).'
    };
  }

  // Fallback mặc định
  return {
    text: `Chào mừng Quý khách đến với **BMW CONCIERGE** của **Bavaria Motor House**. Hiện tại salon đang trưng bày **8 tuyệt tác BMW** thuộc các phân khúc:\n\n• **Luxury Sedan**: ${v750e.shortName}, ${vi7.shortName}, ${v530i.shortName}\n• **Premium SUV**: ${vx7.shortName} (7 chỗ), ${vx5.shortName} (5 chỗ)\n• **Grand Touring**: ${v840i.shortName}, ${vz4.shortName}\n• **High Performance**: ${vm4.shortName}, ${vm3.shortName}\n\nQuý khách có thể bấm vào các câu hỏi gợi ý bên dưới để tra cứu nhanh thông tin trả góp, gói bảo hành BSI, thời gian giao xe hoặc nhấn nút **Đặt lịch lái thử** để trải nghiệm thực tế ngay hôm nay!`,
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
      text: 'Kính chào Quý khách đến với **BAVARIA MOTOR HOUSE**. Tôi là **BMW CONCIERGE** — Cố vấn bán hàng AI chuyên biệt của salon.\n\nTôi sẵn sàng giải đáp mọi thắc mắc về giá bán, chính sách trả góp ngân hàng, gói bảo hành BSI, chi phí lăn bánh hoặc sắp xếp lịch hẹn lái thử tận nơi.\n\n💡 *Quý khách có thể nhấn nhanh vào các câu hỏi thường gặp bên dưới để nhận câu trả lời ngay:*',
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
        text: 'Cuộc trò chuyện đã được làm mới. Quý khách có thể bấm nhanh vào các câu hỏi thường gặp bên dưới (trả góp, bảo hành BSI, thời gian giao xe, so sánh các phiên bản...) để **BMW CONCIERGE** hỗ trợ ngay!',
        recommendedModels: [BAVARIA_VEHICLES[0], BAVARIA_VEHICLES[1]]
      }
    ]);
  };

  const renderFormattedText = (text) => {
    return text.split('\n').map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*|\*[^*]+?\*)/g);
      return (
        <p key={lineIdx} className={lineIdx > 0 ? 'mt-1.5' : ''}>
          {parts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={idx} className="font-semibold text-[#F4F5F6]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={idx} className="italic text-[#93C5FD]">
                  {part.slice(1, -1)}
                </em>
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
            className="px-3.5 py-2 border-t overflow-x-auto flex items-center gap-2 shrink-0 no-scrollbar"
            style={{ backgroundColor: '#15191F', borderColor: '#303740' }}
          >
            <span className="text-[10px] uppercase font-semibold text-[#60A5FA] tracking-wider shrink-0 mr-1 flex items-center gap-1 select-none">
              <Sparkles className="w-3 h-3 text-[#0078D6]" />
              <span>Gợi ý:</span>
            </span>
            {SUGGESTED_QUESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSendQuery(suggestion)}
                className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all whitespace-nowrap cursor-pointer hover:border-[#0078D6] hover:text-white hover:bg-[#0078D6]/15 hover:scale-[1.02]"
                style={{
                  backgroundColor: '#0B0D10',
                  borderColor: '#303740',
                  color: '#CBD5E1'
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
