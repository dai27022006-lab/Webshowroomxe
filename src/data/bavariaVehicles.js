/**
 * BAVARIA MOTOR HOUSE — Curated BMW Vehicle Collection (Demo Inventory)
 * All images are real BMW photographs stored locally in /bavaria/ (sourced from Wikimedia Commons).
 * Prices & specifications are indicative sample showroom data for demonstration purposes.
 */

import { getAssetUrl } from '../utils/asset';

export const BAVARIA_CATEGORIES = [
  { id: 'all', label: 'Tất Cả Phân Khúc', labelEn: 'All Categories' },
  { id: 'Luxury Sedan', label: 'Luxury Sedan', labelEn: 'Executive & Flagship Sedans' },
  { id: 'Premium SUV', label: 'Premium SUV', labelEn: 'Sports Activity Vehicles' },
  { id: 'Grand Touring', label: 'Grand Touring', labelEn: 'Gran Coupé & Roadster' },
  { id: 'High Performance', label: 'High Performance', labelEn: 'BMW M GmbH Division' }
];

export const BAVARIA_MODEL_FAMILIES = [
  { id: 'all', label: 'Tất cả dòng xe' },
  { id: '7 Series', label: 'BMW 7 Series / i7' },
  { id: 'X7', label: 'BMW X7' },
  { id: 'X5', label: 'BMW X5' },
  { id: '5 Series', label: 'BMW 5 Series' },
  { id: '8 Series', label: 'BMW 8 Series' },
  { id: 'M Series', label: 'BMW M3 / M4' },
  { id: 'Z4', label: 'BMW Z4' }
];

export const BAVARIA_VEHICLES = [
  {
    id: 'bmw-750e-g70',
    name: 'BMW 750e xDrive Pure Excellence',
    shortName: 'BMW 7 Series (G70)',
    family: '7 Series',
    chassis: 'G70',
    category: 'Luxury Sedan',
    year: 2025,
    condition: 'New',
    conditionLabel: 'Xe Mới (trưng bày tại Salon)',
    mileage: '0 km',
    priceNumeric: 6499000000,
    priceFormatted: '6.499.000.000 VNĐ',
    priceNote: 'Giá tham khảo tiêu chuẩn (Indicative Showroom Price)',
    featured: true,
    heroHighlight: true,
    badge: 'FLAGSHIP SEDAN',
    exteriorColor: 'Black Sapphire Metallic',
    interiorTrim: 'Da BMW Individual Merino Amarone / Ốp gỗ Fineline Đen',
    engine: '3.0L TwinPower Turbo I6 + Mô-tơ điện Plug-in Hybrid (489 HP / 700 Nm)',
    transmission: 'Hộp số tự động 8 cấp Steptronic Sport • Dẫn động 4 bánh xDrive',
    acceleration: '4,8 giây (0–100 km/h)',
    topSpeed: '250 km/h',
    fuelConsumption: '1,8 – 2,2 L/100km (Kết hợp WLTP)',
    seatingCapacity: '5 chỗ (Cấu hình ghế thương gia Executive Lounge phía sau)',
    idealFor: ['Doanh nhân & Chủ tịch', 'Di chuyển ngoại giao', 'Gia đình thượng lưu', 'Ưu tiên sự êm ái tuyệt đối'],
    summary:
      'Đỉnh cao sedan hạng sang cỡ lớn thế hệ G70 của BMW, kết hợp ngôn ngữ thiết kế uy nghi, khoang thương gia Executive Lounge và hệ truyền động Plug-in Hybrid mượt mà, tĩnh lặng.',
    description:
      'BMW 7 Series (G70) định hình chuẩn mực mới cho phân khúc sedan đầu bảng. Mặt trước nổi bật với cụm đèn pha pha lê BMW Iconic Glow và lưới tản nhiệt phát sáng. Bên trong khoang cabin, thanh tương tác BMW Interaction Bar chạy dọc bảng táp-lô kết hợp cùng ghế da BMW Individual Merino khâu quả trám mang đến không gian tĩnh lặng như một phòng chờ hạng nhất di động.',
    images: {
      main: '/bavaria/bmw-7-series-side.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-7-series-side.jpg',
          caption: 'BMW 7 Series (G70) — Góc nhìn 3/4 trước ngoại thất Black Sapphire'
        },
        {
          url: '/bavaria/bmw-7-series-main.jpg',
          caption: 'BMW 7 Series (G70) — Thiết kế thân xe trường dáng trục cơ sở dài'
        },
        {
          url: '/bavaria/bmw-7-series-rear.jpg',
          caption: 'BMW 7 Series (G70) — Góc nhìn 3/4 phía sau với cụm đèn hậu LED thanh mảnh'
        },
        {
          url: '/bavaria/bmw-interior-dash.jpg',
          caption: 'Khoang lái BMW Curved Display & dải pha lê BMW Interaction Bar'
        },
        {
          url: '/bavaria/bmw-interior-seats.jpg',
          caption: 'Ghế bọc da BMW Individual Merino Amarone cao cấp'
        },
        {
          url: '/bavaria/bmw-interior-rear.jpg',
          caption: 'Không gian hàng ghế thương gia phía sau'
        }
      ]
    },
    specs: [
      { label: 'Thế hệ / Mã khung gầm', value: 'G70 (Flagship Luxury Sedan)' },
      { label: 'Hệ truyền động', value: 'I6 3.0L TwinPower Turbo PHEV' },
      { label: 'Công suất cực đại', value: '489 mã lực (HP) / 700 Nm' },
      { label: 'Hộp số & Dẫn động', value: '8 cấp Steptronic • AWD xDrive' },
      { label: 'Hệ thống treo', value: 'Khí nén thích ứng 2 trục tự động cân bằng' },
      { label: 'Âm thanh', value: 'Bowers & Wilkins Diamond Surround' }
    ],
    features: [
      'Cụm đèn trước pha lê Swarovski Iconic Glow',
      'Cửa đóng/mở tự động thông minh toàn phần',
      'Hệ thống treo khí nén thích ứng 2 trục & đánh lái bánh sau Integral Active Steering',
      'Ghế thương gia Executive Lounge tích hợp massage 18 điểm và đệm đỡ bắp chân',
      'Trần kính toàn cảnh Panorama Sky Lounge tích hợp hiệu ứng LED',
      'Màn hình cong BMW Curved Display với hệ điều hành BMW OS 8.5'
    ]
  },
  {
    id: 'bmw-x7-m60i-g07',
    name: 'BMW X7 xDrive40i M Sport (LCI)',
    shortName: 'BMW X7 (G07 LCI)',
    family: 'X7',
    chassis: 'G07 LCI',
    category: 'Premium SUV',
    year: 2025,
    condition: 'New',
    conditionLabel: 'Xe Mới (trưng bày tại Salon)',
    mileage: '0 km',
    priceNumeric: 5549000000,
    priceFormatted: '5.549.000.000 VNĐ',
    priceNote: 'Giá tham khảo tiêu chuẩn (Indicative Showroom Price)',
    featured: true,
    heroHighlight: false,
    badge: 'FULL-SIZE 7-SEAT SAV',
    exteriorColor: 'Dravit Grey Metallic',
    interiorTrim: 'Da BMW Individual Merino Tartufo / Ốp gỗ Fineline Stripe',
    engine: '3.0L TwinPower Turbo I6 + Mild-Hybrid 48V (381 HP / 540 Nm)',
    transmission: 'Hộp số tự động 8 cấp Steptronic Sport • Dẫn động xDrive',
    acceleration: '5,8 giây (0–100 km/h)',
    topSpeed: '250 km/h',
    fuelConsumption: '9,6 – 10,5 L/100km (Kết hợp)',
    seatingCapacity: '7 chỗ rộng rãi (Hoặc tùy chọn 6 ghế Captain Seat)',
    idealFor: ['Gia đình đa thế hệ', 'Đi công tác đường dài', 'Chủ doanh nghiệp yêu thích SUV cỡ lớn', 'Địa hình đa dạng'],
    summary:
      'Mẫu SUV 7 chỗ đầu bảng của thương hiệu xứ Bavaria, mang lại sự kết hợp hoàn hảo giữa uy thế ngoại hình, không gian 3 hàng ghế hạng thương gia và hệ thống treo khí nén êm ái.',
    description:
      'BMW X7 LCI (G07) là biểu tượng đỉnh cao trong gia đình X-Series. Phiên bản nâng cấp LCI sở hữu thiết kế đèn pha hai tầng sắc sảo, gói ngoại thất M Sport thể thao cùng mâm hợp kim 22 inch. Toàn bộ 3 hàng ghế đều chỉnh điện, bọc da Merino thượng hạng và trang bị hệ thống điều hòa tự động 5 vùng độc lập, lý tưởng cho cả những chuyến công tác xa lẫn hành trình cùng gia đình.',
    images: {
      main: '/bavaria/bmw-x7-main.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-x7-main.jpg',
          caption: 'BMW X7 (G07 LCI) — Ngoại thất 3/4 trước mạnh mẽ và bề thế'
        },
        {
          url: '/bavaria/bmw-x7-front.jpg',
          caption: 'BMW X7 (G07) — Góc nhìn trực diện với lưới tản nhiệt Iconic Glow'
        },
        {
          url: '/bavaria/bmw-x7-rear.jpg',
          caption: 'BMW X7 (G07) — Thiết kế đuôi xe bề thế với cốp mở vỏ sò 2 phần'
        },
        {
          url: '/bavaria/bmw-interior-tartufo.jpg',
          caption: 'Nội thất da BMW Individual Merino Tartufo sang trọng'
        },
        {
          url: '/bavaria/bmw-interior-dash.jpg',
          caption: 'Cụm màn hình cong BMW Curved Display hiện đại'
        }
      ]
    },
    specs: [
      { label: 'Thế hệ / Mã khung gầm', value: 'G07 LCI (Full-Size SAV)' },
      { label: 'Động cơ', value: 'I6 3.0L TwinPower Turbo + 48V Mild-Hybrid' },
      { label: 'Công suất / Mô-men xoắn', value: '381 HP / 540 Nm' },
      { label: 'Hộp số & Dẫn động', value: '8 cấp Steptronic Sport • AWD xDrive' },
      { label: 'Hệ thống treo', value: 'Khí nén 2 trục thích ứng + Executive Drive Pro' },
      { label: 'Cấu hình ghế', value: '3 hàng ghế (7 chỗ chỉnh điện toàn phần)' }
    ],
    features: [
      'Gói trang bị ngoại thất & phanh hiệu năng cao M Sport',
      'Hệ thống treo khí nén 2 trục nâng hạ gầm chủ động 80mm',
      'Cửa sổ trời toàn cảnh Panorama Sky Lounge kéo dài đến hàng ghế thứ 3',
      'Hệ thống âm thanh vòm Harman Kardon / Bowers & Wilkins cao cấp',
      'Cần số pha lê CraftedClarity chế tác thủ công',
      'Cốp sau đóng/mở điện 2 tầng (Split Tailgate) tiện dụng'
    ]
  },
  {
    id: 'bmw-m4-comp-g82',
    name: 'BMW M4 Competition Coupé (G82)',
    shortName: 'BMW M4 Competition',
    family: 'M Series',
    chassis: 'G82',
    category: 'High Performance',
    year: 2024,
    condition: 'New',
    conditionLabel: 'Xe Mới (Phân phối giới hạn)',
    mileage: '0 km',
    priceNumeric: 5299000000,
    priceFormatted: '5.299.000.000 VNĐ',
    priceNote: 'Giá tham khảo tiêu chuẩn (Indicative Showroom Price)',
    featured: true,
    heroHighlight: false,
    badge: 'BMW M GMBH • 510 HP',
    exteriorColor: 'Sao Paulo Yellow / Brooklyn Grey',
    interiorTrim: 'Da Merino Yas Marina Blue / Ốp sợi Carbon M',
    engine: '3.0L M TwinPower Turbo I6 (S58) — 510 HP / 650 Nm',
    transmission: 'Hộp số 8 cấp M Steptronic với Drivelogic',
    acceleration: '3,9 giây (0–100 km/h)',
    topSpeed: '290 km/h (với M Driver’s Package)',
    fuelConsumption: '9,8 – 10,2 L/100km',
    seatingCapacity: '4 chỗ (Ghế đua M Carbon Bucket Seats)',
    idealFor: ['Tín đồ tốc độ & Cảm giác lái thuần khiết', 'Sưu tầm xe thể thao hiệu năng cao', 'Di chuyển cá nhân cuối tuần'],
    summary:
      'Tuyệt tác Coupé hiệu năng cao từ phân nhánh BMW M GmbH với khối động cơ S58 510 mã lực, mui xe sợi carbon CFRP và khả năng kiểm soát thân xe chuẩn đường đua.',
    description:
      'BMW M4 Competition Coupé (G82) đại diện cho DNA đua xe thuần khiết của BMW M. Khối động cơ 6 xi-lanh thẳng hàng S58 trứ danh sản sinh 510 mã lực, kết hợp cùng vi sai chủ động Active M Differential và hệ thống treo thích ứng Adaptive M. Thiết kế khí động học với mui xe Carbon trần (CFRP), hốc bánh mở rộng cơ bắp và hệ thống ống xả kép 4 họng M Sport tạo nên sức hút không thể nhầm lẫn.',
    images: {
      main: '/bavaria/bmw-m4-main.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-m4-main.jpg',
          caption: 'BMW M4 Competition (G82) trưng bày trong không gian kiến trúc BMW Welt'
        },
        {
          url: '/bavaria/bmw-m4-front.jpg',
          caption: 'BMW M4 (G82) — Thiết kế đầu xe khí động học đặc trưng của BMW M'
        },
        {
          url: '/bavaria/bmw-m4-rear.jpg',
          caption: 'BMW M4 Competition (G82) — Đuôi xe cơ bắp với bộ khuếch tán và 4 ống xả M'
        },
        {
          url: '/bavaria/bmw-interior-dash.jpg',
          caption: 'Giao diện buồng lái kỹ thuật số BMW Curved Display'
        }
      ]
    },
    specs: [
      { label: 'Phân nhánh phát triển', value: 'BMW M GmbH — Mã khung gầm G82' },
      { label: 'Động cơ', value: 'S58 3.0L M TwinPower Turbo I6' },
      { label: 'Công suất / Mô-men xoắn', value: '510 HP @ 6.250 rpm / 650 Nm' },
      { label: 'Tăng tốc 0–100 km/h', value: '3,9 giây' },
      { label: 'Mui xe & Gia cường', value: 'Sợi Carbon CFRP siêu nhẹ' },
      { label: 'Hệ thống phanh', value: 'M Compound / Tùy chọn M Carbon Ceramic' }
    ],
    features: [
      'Động cơ S58 6 xi-lanh thẳng hàng chia sẻ nền tảng cùng xe đua BMW M4 GT3',
      'Mui xe bằng vật liệu sợi carbon gia cường (CFRP) giúp hạ thấp trọng tâm',
      'Hệ thống phân tích đường đua M Drive Professional (M Drift Analyser & M Laptimer)',
      'Ghế thể thao M Sport / Tùy chọn ghế M Carbon Bucket',
      'Nút chuyển chế độ M1 / M2 trực tiếp trên vô-lăng thể thao M',
      'Hệ thống treo Adaptive M và vi sai cầu sau Active M Differential'
    ]
  },
  {
    id: 'bmw-x5-g05-lci',
    name: 'BMW X5 xDrive40i M Sport (LCI)',
    shortName: 'BMW X5 (G05 LCI)',
    family: 'X5',
    chassis: 'G05 LCI',
    category: 'Premium SUV',
    year: 2025,
    condition: 'New',
    conditionLabel: 'Xe Mới (Sẵn xe giao ngay)',
    mileage: '0 km',
    priceNumeric: 3909000000,
    priceFormatted: '3.909.000.000 VNĐ',
    priceNote: 'Giá tham khảo tiêu chuẩn (Indicative Showroom Price)',
    featured: true,
    heroHighlight: false,
    badge: 'EXECUTIVE SAV',
    exteriorColor: 'Mineral White / Carbon Black',
    interiorTrim: 'Da Sensafin / Merino Coffee cao cấp',
    engine: '3.0L TwinPower Turbo I6 + Mild-Hybrid 48V (381 HP / 540 Nm)',
    transmission: 'Hộp số 8 cấp Steptronic Sport • Dẫn động 4 bánh xDrive',
    acceleration: '5,4 giây (0–100 km/h)',
    topSpeed: '250 km/h',
    fuelConsumption: '8,9 – 9,5 L/100km',
    seatingCapacity: '5 chỗ rộng rãi',
    idealFor: ['Gia đình hiện đại', 'Doanh nhân tự cầm lái hàng ngày', 'Đi công tác liên tỉnh', 'Cân bằng hoàn hảo giữa thể thao & tiện nghi'],
    summary:
      'Người tiên phong phân khúc Sports Activity Vehicle (SAV) với kích thước linh hoạt trong phố, khả năng vận hành đầm chắc chuẩn Đức và không gian 5 chỗ sang trọng.',
    description:
      'BMW X5 (G05 LCI) là lựa chọn cân bằng nhất cho khách hàng tìm kiếm một chiếc SUV hạng sang vừa linh hoạt khi tự cầm lái hàng ngày trong đô thị, vừa mạnh mẽ và an toàn trên đường trường. Khối động cơ B58 3.0L kết hợp công nghệ Mild-Hybrid 48V nâng công suất lên 381 mã lực, phản hồi chân ga tức thì và tiết kiệm nhiên liệu tối ưu.',
    images: {
      main: '/bavaria/bmw-x5-main.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-x5-main.jpg',
          caption: 'BMW X5 (G05) — Góc nhìn 3/4 trước với ngôn ngữ thiết kế SAV năng động'
        },
        {
          url: '/bavaria/bmw-x5-side.jpg',
          caption: 'BMW X5 (G05 LCI) — Tỷ lệ thân xe cân đối và khỏe khoắn'
        },
        {
          url: '/bavaria/bmw-interior-tartufo.jpg',
          caption: 'Khoang nội thất bọc da cao cấp với độ hoàn thiện tinh xảo'
        },
        {
          url: '/bavaria/bmw-interior-dash.jpg',
          caption: 'Màn hình cong nguyên khối BMW Curved Display'
        }
      ]
    },
    specs: [
      { label: 'Thế hệ / Mã khung gầm', value: 'G05 LCI (Mid-Size Luxury SAV)' },
      { label: 'Động cơ', value: 'B58 3.0L I6 TwinPower Turbo + 48V' },
      { label: 'Công suất / Mô-men xoắn', value: '381 HP / 540 Nm' },
      { label: 'Hộp số & Dẫn động', value: '8 cấp Steptronic Sport • AWD xDrive' },
      { label: 'Hệ thống treo', value: 'Adaptive M Suspension thích ứng' },
      { label: 'Dung tích khoang hành lý', value: '650 – 1.870 Lít' }
    ],
    features: [
      'Gói ngoại thất M Sport thể thao cùng mâm hợp kim 20–21 inch',
      'Hệ thống đèn pha thích ứng Adaptive LED thiết kế mảnh mới',
      'Hệ thống treo thích ứng Adaptive M tự động điều chỉnh độ cứng/mềm',
      'Hỗ trợ đỗ xe tự động Parking Assistant Professional kèm lùi nhớ 200m',
      'Hệ thống âm thanh vòm Harman Kardon 16 loa 464W',
      'Cửa hít tự động (Soft-Close Doors) và kính cách âm 2 lớp'
    ]
  },
  {
    id: 'bmw-i7-xdrive60-g70',
    name: 'BMW i7 xDrive60 Pure Excellence',
    shortName: 'BMW i7 xDrive60',
    family: '7 Series',
    chassis: 'G70 BEV',
    category: 'Luxury Sedan',
    year: 2025,
    condition: 'New',
    conditionLabel: 'Xe Mới (Thuần điện Flagship)',
    mileage: '0 km',
    priceNumeric: 6899000000,
    priceFormatted: '6.899.000.000 VNĐ',
    priceNote: 'Giá tham khảo tiêu chuẩn (Indicative Showroom Price)',
    featured: true,
    heroHighlight: false,
    badge: 'ALL-ELECTRIC LUXURY',
    exteriorColor: 'Oxide Grey / Tanzanite Blue Two-Tone',
    interiorTrim: 'Da BMW Individual Merino Mocha & Cashmere',
    engine: 'Dual Electric Motors eDrive thế hệ 5 (544 HP / 745 Nm)',
    transmission: 'Truyền động điện 1 cấp • Dẫn động 4 bánh toàn thời gian xDrive',
    acceleration: '4,7 giây (0–100 km/h)',
    topSpeed: '240 km/h',
    fuelConsumption: 'Phạm vi di chuyển 590 – 625 km (WLTP)',
    seatingCapacity: '5 chỗ (Ghế thương gia Executive Lounge)',
    idealFor: ['Lãnh đạo tiên phong công nghệ', 'Di chuyển nội đô & ngoại giao siêu tĩnh lặng', 'Doanh nghiệp hướng tới phát triển bền vững ESG'],
    summary:
      'Chiếc sedan hạng sang đầu bảng thuần điện đầu tiên trên thế giới của BMW, mang đến trải nghiệm di chuyển không tiếng ồn động cơ, mô-men xoắn tức thì 745 Nm và phạm vi hoạt động lên tới 625 km.',
    description:
      'BMW i7 xDrive60 định nghĩa lại khái niệm sang trọng trong kỷ nguyên di chuyển điện hóa. Hai mô-tơ điện đặt tại cầu trước và cầu sau phối hợp mượt mà tạo ra công suất 544 mã lực nhưng vẫn giữ sự êm ái tuyệt đối nhờ gói cách âm chuyên biệt và hệ thống âm thanh mô phỏng BMW IconicSounds Electric do nhà soạn nhạc Hans Zimmer đồng sáng tạo.',
    images: {
      main: '/bavaria/bmw-i7-main.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-i7-main.jpg',
          caption: 'BMW i7 xDrive60 (G70) — Góc nhìn 3/4 trước uy nghi và hiện đại'
        },
        {
          url: '/bavaria/bmw-i7-rear.jpg',
          caption: 'BMW i7 xDrive60 — Góc nhìn 3/4 phía sau với điểm nhấn khí động học'
        },
        {
          url: '/bavaria/bmw-interior-dash.jpg',
          caption: 'Khoang lái kỹ thuật số BMW i7 với dải BMW Interaction Bar'
        },
        {
          url: '/bavaria/bmw-interior-tartufo.jpg',
          caption: 'Ghế bọc da BMW Individual Merino chế tác thủ công'
        }
      ]
    },
    specs: [
      { label: 'Hệ truyền động', value: 'Dual BMW eDrive (Thuần điện BEV)' },
      { label: 'Công suất / Mô-men xoắn', value: '544 HP / 745 Nm' },
      { label: 'Dung lượng pin khả dụng', value: '101,7 kWh (Sạc nhanh DC 195 kW)' },
      { label: 'Quãng đường di chuyển', value: '590 – 625 km (Chuẩn WLTP)' },
      { label: 'Tăng tốc 0–100 km/h', value: '4,7 giây' },
      { label: 'Âm thanh trải nghiệm', value: 'Bowers & Wilkins + Hans Zimmer IconicSounds' }
    ],
    features: [
      'Hệ truyền động thuần điện 2 mô-tơ xDrive êm ái tuyệt đối',
      'Khả năng sạc nhanh DC 10 phút thêm ~170 km quãng đường di chuyển',
      'Cửa tự động đóng/mở thông minh và đèn pha lê Swarovski Iconic Glow',
      'Hàng ghế sau thương gia Executive Lounge tích hợp màn hình cảm ứng 5.5 inch trên cửa',
      'Hệ thống đánh lái bánh sau Integral Active Steering giúp quay đầu linh hoạt',
      'Kính nhiều lớp cách âm và cách nhiệt Climate Comfort toàn xe'
    ]
  },
  {
    id: 'bmw-530i-g60',
    name: 'BMW 530i M Sport (Thế hệ mới G60)',
    shortName: 'BMW 5 Series (G60)',
    family: '5 Series',
    chassis: 'G60',
    category: 'Luxury Sedan',
    year: 2025,
    condition: 'New',
    conditionLabel: 'Xe Mới (Thế hệ G60 hoàn toàn mới)',
    mileage: '0 km',
    priceNumeric: 3099000000,
    priceFormatted: '3.099.000.000 VNĐ',
    priceNote: 'Giá tham khảo tiêu chuẩn (Indicative Showroom Price)',
    featured: true,
    heroHighlight: false,
    badge: 'NEW GENERATION G60',
    exteriorColor: 'Brooklyn Grey / Sophisto Grey',
    interiorTrim: 'Da Veganza / Merino Đen khâu chỉ tương phản M',
    engine: '2.0L TwinPower Turbo + Mild-Hybrid 48V (258 HP / 400 Nm)',
    transmission: 'Hộp số tự động 8 cấp Steptronic Sport • Cầu sau RWD',
    acceleration: '6,2 giây (0–100 km/h)',
    topSpeed: '250 km/h',
    fuelConsumption: '6,8 – 7,4 L/100km',
    seatingCapacity: '5 chỗ',
    idealFor: ['Giám đốc điều hành trẻ', 'Di chuyển hàng ngày & tiếp đối tác', 'Yêu thích công nghệ mới & cảm giác lái lanh lẹ'],
    summary:
      'Thế hệ thứ 8 (G60) hoàn toàn mới của dòng sedan doanh nhân bán chạy nhất lịch sử BMW, thừa hưởng thanh tương tác Interaction Bar từ 7 Series và cảm giác lái cầu sau lanh lẹ.',
    description:
      'BMW 5 Series thế hệ mới (G60) mang diện mạo hoàn toàn lột xác với kích thước mở rộng vượt trội, chiều dài tổng thể đạt hơn 5 mét. Thiết kế sắc nét đi kèm con số "5" dập nổi tại góc Hofmeister Kink trên cột C. Khoang nội thất thừa hưởng công nghệ từ đàn anh 7 Series với màn hình cong BMW Curved Display và dải đèn viền pha lê BMW Interaction Bar.',
    images: {
      main: '/bavaria/bmw-5-series-main.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-5-series-main.jpg',
          caption: 'BMW 5 Series (G60) — Thế hệ hoàn toàn mới góc nhìn 3/4 trước'
        },
        {
          url: '/bavaria/bmw-5-series-side.jpg',
          caption: 'BMW 5 Series (G60) — Phom dáng sedan doanh nhân năng động'
        },
        {
          url: '/bavaria/bmw-5-series-rear.jpg',
          caption: 'BMW 5 Series (G60) — Cụm đèn hậu LED phẳng hai tầng hiện đại'
        },
        {
          url: '/bavaria/bmw-interior-dash.jpg',
          caption: 'Khoang lái kỹ thuật số thế hệ mới với BMW OS 8.5'
        }
      ]
    },
    specs: [
      { label: 'Thế hệ / Mã khung gầm', value: 'G60 (8th Gen Executive Sedan)' },
      { label: 'Động cơ', value: '2.0L I4 TwinPower Turbo + 48V Mild-Hybrid' },
      { label: 'Công suất / Mô-men xoắn', value: '258 HP / 400 Nm' },
      { label: 'Hộp số & Dẫn động', value: '8 cấp Steptronic Sport • RWD' },
      { label: 'Chiều dài x Trục cơ sở', value: '5.060 mm x 2.995 mm' },
      { label: 'Hệ thống âm thanh', value: 'Bowers & Wilkins Surround Sound' }
    ],
    features: [
      'Lưới tản nhiệt phát sáng BMW Iconic Glow kết hợp gói M Sport',
      'Thanh tương tác cảm ứng BMW Interaction Bar chạy dọc khoang lái',
      'Vô-lăng thể thao M vát đáy thế hệ mới tích hợp lẫy chuyển số Boost',
      'Hệ thống hỗ trợ lái nâng cao Driving Assistant Professional',
      'Hiển thị thông tin trên kính lái BMW Live Cockpit Professional (HUD)',
      'Phân bổ trọng lượng 50:50 hoàn hảo đặc trưng của BMW'
    ]
  },
  {
    id: 'bmw-840i-gc-g16',
    name: 'BMW 840i Gran Coupé M Sport (G16)',
    shortName: 'BMW 8 Series Gran Coupé',
    family: '8 Series',
    chassis: 'G16',
    category: 'Grand Touring',
    year: 2023,
    condition: 'Pre-owned',
    conditionLabel: 'Xe Lướt Tuyển Chọn (6.800 km)',
    mileage: '6.800 km',
    priceNumeric: 5180000000,
    priceFormatted: '5.180.000.000 VNĐ',
    priceNote: 'Giá tham khảo xe lướt tuyển chọn (Indicative Pre-Owned Price)',
    featured: false,
    heroHighlight: false,
    badge: '4-DOOR GRAND TOURER',
    exteriorColor: 'Frozen Bluestone / Barcelona Blue',
    interiorTrim: 'Da Merino Cognac / Trần Alcantara Anthracite',
    engine: '3.0L TwinPower Turbo I6 (333 HP / 500 Nm)',
    transmission: 'Hộp số tự động 8 cấp Steptronic Sport • Cầu sau RWD',
    acceleration: '5,4 giây (0–100 km/h)',
    topSpeed: '250 km/h',
    fuelConsumption: '8,5 – 9,1 L/100km',
    seatingCapacity: '4+1 chỗ (Cấu hình Coupé 4 cửa thể thao)',
    idealFor: ['Chủ nhân yêu thích sự khác biệt & thanh lịch', 'Grand Touring đường dài', 'Doanh nhân thích tự cầm lái xe Coupé 4 cửa'],
    summary:
      'Mẫu Coupé 4 cửa hạng sang đầu bảng với đường mui vuốt dốc quyến rũ, cửa kính không viền và sự sang trọng cá nhân hóa dành cho những chủ nhân muốn khẳng định gu thẩm mỹ riêng.',
    description:
      'BMW 840i Gran Coupé (G16) là mẫu Grand Tourer 4 cửa sở hữu thiết kế giàu cảm xúc bậc nhất của BMW. Thân xe thấp, rộng với những đường gân điêu khắc sắc sảo và cửa kính không viền tinh tế. Chiếc xe trong bộ sưu tập thuộc diện xe lướt tuyển chọn (6.800 km), đã qua quy trình kiểm định kỹ thuật nghiêm ngặt tại Bavaria Motor House.',
    images: {
      main: '/bavaria/bmw-8-series-side.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-8-series-side.jpg',
          caption: 'BMW 8 Series Gran Coupé (G16) — Góc nhìn 3/4 trước trưng bày tại THE 8 Lounge'
        },
        {
          url: '/bavaria/bmw-8-series-main.jpg',
          caption: 'BMW 8 Series Gran Coupé — Đường mui Coupé vuốt dài và đuôi xe rộng bề thế'
        },
        {
          url: '/bavaria/bmw-interior-seats.jpg',
          caption: 'Ghế ngồi thể thao đa chức năng bọc da Merino cao cấp'
        }
      ]
    },
    specs: [
      { label: 'Thế hệ / Mã khung gầm', value: 'G16 (Luxury 4-Door Gran Coupé)' },
      { label: 'Tình trạng & ODO', value: 'Xe lướt tuyển chọn • 6.800 km' },
      { label: 'Động cơ', value: '3.0L I6 TwinPower Turbo (333 HP / 500 Nm)' },
      { label: 'Hộp số & Dẫn động', value: '8 cấp Steptronic Sport • RWD' },
      { label: 'Vi sai cầu sau', value: 'M Sport Differential tiêu chuẩn' },
      { label: 'Cấu trúc thân xe', value: 'Carbon Core trọng lượng nhẹ' }
    ],
    features: [
      'Cửa kính không viền (Frameless Doors) đậm chất Coupé hạng sang',
      'Cấu trúc khung gầm Carbon Core thừa hưởng từ dòng xe đầu bảng',
      'Ghế ngồi thể thao M Multifunction tích hợp tựa đầu liền khối',
      'Cần số pha lê CraftedClarity và cửa hít tự động Soft-Close',
      'Hệ thống âm thanh Harman Kardon Surround 16 loa',
      'Đã hoàn tất kiểm định chất lượng toàn diện tại Bavaria Motor House'
    ]
  },
  {
    id: 'bmw-m3-comp-g80',
    name: 'BMW M3 Competition Sedan (G80)',
    shortName: 'BMW M3 Competition',
    family: 'M Series',
    chassis: 'G80',
    category: 'High Performance',
    year: 2023,
    condition: 'Pre-owned',
    conditionLabel: 'Xe Lướt Tuyển Chọn (4.200 km)',
    mileage: '4.200 km',
    priceNumeric: 4850000000,
    priceFormatted: '4.850.000.000 VNĐ',
    priceNote: 'Giá tham khảo xe lướt tuyển chọn (Indicative Pre-Owned Price)',
    featured: false,
    heroHighlight: false,
    badge: 'ICONIC M SEDAN • 510 HP',
    exteriorColor: 'Isle of Man Green / Alpine White',
    interiorTrim: 'Da Full Merino Kyalami Orange / Ốp Carbon Fibre',
    engine: '3.0L M TwinPower Turbo I6 (S58) — 510 HP / 650 Nm',
    transmission: 'Hộp số 8 cấp M Steptronic với Drivelogic',
    acceleration: '3,9 giây (0–100 km/h)',
    topSpeed: '290 km/h',
    fuelConsumption: '9,8 – 10,2 L/100km',
    seatingCapacity: '5 chỗ (Sedan hiệu năng cao)',
    idealFor: ['Đam mê hiệu năng M nhưng cần sự thực dụng 4 cửa', 'Sưu tầm biểu tượng M3', 'Cầm lái hàng ngày & Track-day'],
    summary:
      'Huyền thoại sedan hiệu năng cao BMW M3 thế hệ G80, kết hợp sự thực dụng của thiết kế 4 cửa 5 chỗ ngồi với sức mạnh 510 mã lực từ khối động cơ S58.',
    description:
      'BMW M3 Competition (G80) là chuẩn mực vàng của phân khúc sedan hiệu năng cao trên toàn cầu suốt hơn 3 thập kỷ. Với vòm bánh xe mở rộng dữ dội, mui xe bằng sợi carbon CFRP và khối động cơ S58 510 mã lực, M3 G80 có thể đưa cả gia đình di chuyển êm ái vào buổi sáng và chinh phục mọi khúc cua tốc độ cao vào buổi chiều.',
    images: {
      main: '/bavaria/bmw-m3-main.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-m3-main.jpg',
          caption: 'BMW M3 Competition (G80) — Góc nhìn 3/4 trước với vòm bánh mở rộng cơ bắp'
        },
        {
          url: '/bavaria/bmw-m3-rear.jpg',
          caption: 'BMW M3 Competition (G80) — Góc nhìn 3/4 phía sau với cánh gió M Carbon và 4 ống xả'
        },
        {
          url: '/bavaria/bmw-interior-dash.jpg',
          caption: 'Khoang lái hiệu năng cao với giao diện M Mode chuyên biệt'
        }
      ]
    },
    specs: [
      { label: 'Phân nhánh / Mã khung gầm', value: 'BMW M GmbH — G80 Sedan' },
      { label: 'Tình trạng & ODO', value: 'Xe lướt tuyển chọn • 4.200 km' },
      { label: 'Động cơ', value: 'S58 3.0L M TwinPower Turbo I6 (510 HP)' },
      { label: 'Mô-men xoắn cực đại', value: '650 Nm @ 2.750 – 5.500 rpm' },
      { label: 'Tăng tốc 0–100 km/h', value: '3,9 giây' },
      { label: 'Mâm xe', value: 'M Forged 19 inch trước / 20 inch sau' }
    ],
    features: [
      'Mui xe sợi carbon trần (CFRP) với 2 đường gân khí động học',
      'Hệ thống kiểm soát lực kéo M Traction Control 10 cấp độ tùy chỉnh',
      'Hệ thống ống xả M Sport với van điều khiển âm thanh điện tử',
      'Ghế thể thao M bọc da Full Merino cao cấp',
      'Phanh hiệu năng cao M Compound đĩa đục lỗ thông gió',
      'Hồ sơ bảo dưỡng và kiểm định đầy đủ tại Bavaria Motor House'
    ]
  },
  {
    id: 'bmw-z4-m40i-g29',
    name: 'BMW Z4 M40i Roadster (G29 LCI)',
    shortName: 'BMW Z4 M40i Roadster',
    family: 'Z4',
    chassis: 'G29 LCI',
    category: 'Grand Touring',
    year: 2024,
    condition: 'Pre-owned',
    conditionLabel: 'Xe Lướt Tuyển Chọn (3.500 km)',
    mileage: '3.500 km',
    priceNumeric: 3650000000,
    priceFormatted: '3.650.000.000 VNĐ',
    priceNote: 'Giá tham khảo xe lướt tuyển chọn (Indicative Pre-Owned Price)',
    featured: false,
    heroHighlight: false,
    badge: 'OPEN-TOP ROADSTER',
    exteriorColor: 'Thundernight Metallic / San Francisco Red',
    interiorTrim: 'Da Vernasca Cognac / Đen thể thao',
    engine: '3.0L M TwinPower Turbo I6 (B58) — 340 HP / 500 Nm',
    transmission: 'Hộp số tự động 8 cấp Steptronic Sport • Cầu sau RWD',
    acceleration: '4,5 giây (0–100 km/h)',
    topSpeed: '250 km/h',
    fuelConsumption: '7,9 – 8,3 L/100km',
    seatingCapacity: '2 chỗ (Mui trần vải mềm đóng/mở điện 10 giây)',
    idealFor: ['Dạo phố cuối tuần & Cung đường ven biển', 'Phong cách sống phóng khoáng', 'Trải nghiệm Roadster mui trần 6 xi-lanh'],
    summary:
      'Chiếc Roadster mui trần 2 chỗ thuần chất với tỷ lệ nắp capo dài kinh điển, mui vải đóng mở trong 10 giây và động cơ 6 xi-lanh thẳng hàng M40i đầy phấn khích.',
    description:
      'BMW Z4 M40i (G29 LCI) mang lại niềm vui cầm lái tự do dưới bầu trời mở. Nhờ vị trí ngồi đặt thấp gần trục sau, phân bổ trọng lượng 50:50 và khối động cơ 3.0L I6 M Performance, Z4 M40i tăng tốc từ 0–100 km/h chỉ trong 4,5 giây. Mui vải mềm Anthracite hiệu ứng bạc có thể đóng hoặc mở hoàn toàn tự động trong 10 giây ngay cả khi xe đang di chuyển ở vận tốc 50 km/h.',
    images: {
      main: '/bavaria/bmw-z4-main.jpg',
      gallery: [
        {
          url: '/bavaria/bmw-z4-main.jpg',
          caption: 'BMW Z4 M40i Roadster (G29 LCI) — Góc nhìn 3/4 trước mui trần phóng khoáng'
        },
        {
          url: '/bavaria/bmw-z4-rear.jpg',
          caption: 'BMW Z4 M40i Roadster — Thiết kế đuôi xe thấp rộng với cánh lướt gió tích hợp'
        },
        {
          url: '/bavaria/bmw-interior-seats.jpg',
          caption: 'Khoang cabin 2 chỗ tập trung hoàn toàn vào người cầm lái'
        }
      ]
    },
    specs: [
      { label: 'Thế hệ / Mã khung gầm', value: 'G29 LCI (M Performance Roadster)' },
      { label: 'Tình trạng & ODO', value: 'Xe lướt tuyển chọn • 3.500 km' },
      { label: 'Động cơ', value: 'B58 3.0L I6 M TwinPower Turbo (340 HP)' },
      { label: 'Tăng tốc 0–100 km/h', value: '4,5 giây' },
      { label: 'Cơ cấu mui trần', value: 'Mui mềm đóng/mở điện trong 10 giây' },
      { label: 'Hệ thống âm thanh', value: 'Harman Kardon Surround 12 loa' }
    ],
    features: [
      'Phiên bản hiệu năng cao M40i trang bị động cơ 6 xi-lanh 3.0L',
      'Mui vải mềm cách âm 3 lớp đóng/mở điện chỉ trong 10 giây',
      'Vi sai cầu sau M Sport Differential và phanh M Sport màu xanh/đỏ',
      'Ghế thể thao M Sport tích hợp tựa đầu liền khối và nhớ vị trí',
      'Hệ thống khung chống lật bảo vệ an toàn ẩn phía sau tựa đầu',
      'Kiểm định tiêu chuẩn kỹ thuật tại Bavaria Motor House'
    ]
  }
];

export const BAVARIA_SERVICES = [
  {
    id: 'srv-consultation',
    code: '01',
    title: 'Tư Vấn Lựa Chọn & Cấu Hình Cá Nhân Hóa',
    titleEn: 'Bespoke Vehicle Consultation',
    shortDesc:
      'Phân tích chuyên sâu nhu cầu di chuyển, phong cách sử dụng và ngân sách để đề xuất dòng xe BMW phù hợp nhất.',
    details: [
      'Tư vấn trực tiếp 1:1 trong phòng Private Lounge riêng tư',
      'Đối chiếu chi tiết giữa các dòng Sedan (5/7 Series), SAV (X5/X7) và dòng hiệu năng cao BMW M',
      'Tư vấn màu sơn ngoại thất, chất liệu da BMW Individual Merino và các gói trang bị M Sport / Pure Excellence'
    ]
  },
  {
    id: 'srv-testdrive',
    code: '02',
    title: 'Trải Nghiệm Lái Thử Chuyên Biệt',
    titleEn: 'Private Test-Drive Experience',
    shortDesc:
      'Sắp xếp lịch hẹn lái thử theo khung giờ riêng với chuyên gia sản phẩm đi kèm thuyết minh tính năng thực tế.',
    details: [
      'Đặt lịch linh hoạt theo khung giờ ưu tiên của khách hàng, chống trùng lịch tự động qua hệ thống AutoLead',
      'Lộ trình thử xe kết hợp cả đường đô thị và cung đường tốc độ tiêu chuẩn',
      'Trải nghiệm thực tế hệ thống treo khí nén, đánh lái bánh sau và hàng ghế thương gia Executive Lounge'
    ]
  },
  {
    id: 'srv-tradein',
    code: '03',
    title: 'Tư Vấn Thu Cũ Đổi Mới Minh Bạch',
    titleEn: 'Executive Trade-In Advisory',
    shortDesc:
      'Hỗ trợ định giá xe đang sử dụng và tư vấn phương án nâng cấp lên các dòng BMW đời mới một cách thuận tiện.',
    details: [
      'Khảo sát và đánh giá tình trạng xe hiện hữu theo quy trình minh bạch',
      'Đề xuất phương án bù trừ tài chính tối ưu khi nâng cấp lên BMW 7 Series, X7 hoặc dòng M',
      'Hỗ trợ trọn gói thủ tục hồ sơ chuyển nhượng nhanh chóng, bảo mật thông tin chủ xe'
    ]
  },
  {
    id: 'srv-financing',
    code: '04',
    title: 'Giải Pháp Tài Chính & Thuê Mua Doanh Nghiệp',
    titleEn: 'Corporate & Private Financing',
    shortDesc:
      'Tư vấn cấu trúc tài chính, vay mua xe cá nhân hoặc đứng tên doanh nghiệp tối ưu dòng tiền và chi phí thuế.',
    details: [
      'Bảng tính minh họa phương án trả góp linh hoạt từ 3 đến 7 năm',
      'Tư vấn hồ sơ tài chính dành riêng cho doanh nghiệp (khấu hao tài sản cố định, hóa đơn VAT)',
      'Kết nối làm việc cùng các đối tác ngân hàng thương mại uy tín tại Việt Nam'
    ]
  },
  {
    id: 'srv-inspection',
    code: '05',
    title: 'Thẩm Định Kỹ Thuật & Minh Bạch Hồ Sơ Xe',
    titleEn: 'Comprehensive Technical Inspection',
    shortDesc:
      'Mỗi chiếc xe trưng bày tại Bavaria Motor House đều có hồ sơ kiểm tra kỹ thuật chi tiết trước khi bàn giao.',
    details: [
      'Kiểm tra tổng thể động cơ, hộp số Steptronic, hệ thống treo khí nén và hệ thống điện tử iDrive',
      'Đảm bảo tính minh bạch về tình trạng thân vỏ, lịch sử vận hành và số ODO thực tế đối với xe lướt',
      'Cung cấp biên bản thông tin kỹ thuật rõ ràng khi khách hàng xem xe trực tiếp tại showroom'
    ]
  },
  {
    id: 'srv-aftersales',
    code: '06',
    title: 'Đồng Hành & Hỗ Trợ Sau Bàn Giao',
    titleEn: 'Dedicated Ownership Concierge',
    shortDesc:
      'Hướng dẫn sử dụng chuyên sâu các tính năng công nghệ trên xe và hỗ trợ kết nối dịch vụ chăm sóc định kỳ.',
    details: [
      'Bàn giao xe tiêu chuẩn kèm buổi hướng dẫn chi tiết hệ điều hành BMW OS 8.5 và các tính năng an toàn',
      'Nhắc lịch bảo dưỡng định kỳ và tư vấn chăm sóc thẩm mỹ ngoại/nội thất chuẩn Detailing',
      'Đội ngũ tư vấn viên luôn sẵn sàng giải đáp thắc mắc kỹ thuật trong suốt quá trình sử dụng'
    ]
  }
];

// Transform image paths dynamically to support subpaths (e.g. GitHub Pages)
BAVARIA_VEHICLES.forEach((vehicle) => {
  if (vehicle.images) {
    if (vehicle.images.main) {
      vehicle.images.main = getAssetUrl(vehicle.images.main);
    }
    if (Array.isArray(vehicle.images.gallery)) {
      vehicle.images.gallery.forEach((item) => {
        if (item.url) {
          item.url = getAssetUrl(item.url);
        }
      });
    }
  }
});
