/* =====================================================
   data/products.js – Product & Category Data
   ===================================================== */
'use strict';

const CATEGORIES = [{
        name: 'Máy Lạnh',
        img: 'https://dienmaysaigon.com/wp-content/uploads/2024/02/May-lanh-Inverter-Comfee-1.5hp-CFS-13VAF-Dien-May-Sai-Gon.jpg'
    },
    {
        name: 'Tủ Lạnh',
        img: 'https://kuchen.com.vn/wp-content/uploads/2024/04/tu-lanh-kuchen-lam-lanh-the-he-moi-ku-ll2511-1.jpg'
    },
    {
        name: 'Máy Giặt',
        img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80'
    },
    {
        name: 'Tivi',
        img: 'https://onewaymobile.vn/images/products/2023/08/24/original/xiaomi-a-32-2.png'
    },
    {
        name: 'Lò Vi Sóng',
        img: 'https://kitchenhome.vn/wp-content/uploads/2019/06/26493_18376_lo-vi-song-electrolux-impreso-30l-ems3085x.jpg'
    }
];

const PRODUCTS = [{
        id: 1,
        name: 'Daikin Inverter 1.5 HP FTKC35UAVMV',
        category: 'Máy Lạnh',
        price: 12990000,
        oldPrice: 15990000,
        discount: 19,
        rating: 3.8,
        reviews: 156,
        images: [
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85',
            'https://images.unsplash.com/photo-1631083215283-b6c4e4e3a71e?w=800&q=85',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&flip=h'
        ],
        desc: 'Máy lạnh Daikin Inverter tiết kiệm điện, làm lạnh nhanh, hoạt động êm ái với công nghệ inverter tiên tiến.',
        specs: {
            'Công suất': '1.5 HP (12,000 BTU)',
            'Công nghệ': 'Inverter',
            'Chế độ': 'Làm lạnh, Hút ẩm, Quạt gió',
            'Diện tích làm lạnh': '15 – 20 m²',
            'Gas': 'R32 thân thiện môi trường',
            'Bảo hành': '2 năm chính hãng'
        }
    },
    {
        id: 2,
        name: 'LG Inverter 1 HP V10API1',
        category: 'Máy Lạnh',
        price: 8490000,
        oldPrice: 9990000,
        discount: 15,
        rating: 4.0,
        reviews: 98,
        images: [
            'https://images.unsplash.com/photo-1631083215283-b6c4e4e3a71e?w=800&q=85',
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85'
        ],
        desc: 'Máy lạnh LG Inverter công suất 1HP phù hợp cho phòng 12–15m², vận hành yên tĩnh và tiết kiệm điện năng.',
        specs: {
            'Công suất': '1.0 HP (9,000 BTU)',
            'Công nghệ': 'Dual Inverter',
            'Chế độ': 'Làm lạnh, Sưởi, Hút ẩm',
            'Diện tích làm lạnh': '12 – 15 m²',
            'Gas': 'R32',
            'Bảo hành': '2 năm chính hãng'
        }
    },
    {
        id: 3,
        name: 'Panasonic Inverter 2 HP CU/CS-PU18YKH-8M',
        category: 'Máy Lạnh',
        price: 16990000,
        oldPrice: null,
        discount: null,
        rating: 4.0,
        reviews: 72,
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85'
        ],
        desc: 'Máy lạnh Panasonic 2HP công nghệ Inverter mạnh mẽ, phù hợp phòng khách rộng, lọc không khí hiệu quả.',
        specs: {
            'Công suất': '2.0 HP (18,000 BTU)',
            'Công nghệ': 'Inverter',
            'Chế độ': 'Làm lạnh, Hút ẩm, Quạt',
            'Diện tích làm lạnh': '25 – 30 m²',
            'Gas': 'R32',
            'Bảo hành': '2 năm chính hãng'
        }
    },
    {
        id: 4,
        name: 'Samsung Inverter 256L RT25M4032S8/SV',
        category: 'Tủ Lạnh',
        price: 6990000,
        oldPrice: 8490000,
        discount: 18,
        rating: 3.7,
        reviews: 234,
        images: [
            'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=85',
            'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=85',
            'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=85&blur=2'
        ],
        desc: 'Tủ lạnh Samsung 256L công nghệ Inverter tiết kiệm điện, ngăn đá làm đá nhanh, khử mùi hiệu quả.',
        specs: {
            'Dung tích': '256 Lít',
            'Công nghệ': 'Digital Inverter',
            'Loại': '2 cửa (trên/dưới)',
            'Màu sắc': 'Bạc ánh kim',
            'Tiết kiệm điện': '≤ 38 kWh/tháng',
            'Bảo hành': '1 năm toàn bộ, 10 năm máy nén'
        }
    },
    {
        id: 5,
        name: 'Panasonic Inverter 366L NR-BL381GKVN',
        category: 'Tủ Lạnh',
        price: 9990000,
        oldPrice: null,
        discount: null,
        rating: 3.7,
        reviews: 187,
        images: [
            'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=85',
            'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=85'
        ],
        desc: 'Tủ lạnh Panasonic 366L Inverter dòng cao cấp, ngăn Prime Fresh giữ thực phẩm tươi lâu hơn.',
        specs: {
            'Dung tích': '366 Lít',
            'Công nghệ': 'Inverter',
            'Loại': '2 cửa',
            'Màu sắc': 'Xanh ánh bạc',
            'Tiết kiệm điện': '≤ 45 kWh/tháng',
            'Bảo hành': '1 năm toàn bộ, 10 năm máy nén'
        }
    },
    {
        id: 6,
        name: 'LG Inverter 9kg FV1409S3W',
        category: 'Máy Giặt',
        price: 7490000,
        oldPrice: 8990000,
        discount: 17,
        rating: 4.2,
        reviews: 315,
        images: [
            'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=85',
            'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=85&sat=-50'
        ],
        desc: 'Máy giặt LG 9kg cửa trước Inverter, công nghệ AI DD tự động điều chỉnh chuyển động giặt tối ưu.',
        specs: {
            'Khối lượng giặt': '9 kg',
            'Loại': 'Cửa trước',
            'Công nghệ': 'AI DD Inverter',
            'Tốc độ vắt': '1400 vòng/phút',
            'Lồng giặt': 'Thép không gỉ',
            'Bảo hành': '2 năm toàn bộ, 10 năm motor'
        }
    },
    {
        id: 7,
        name: 'Samsung AddWash 10kg WW10TP54DSH',
        category: 'Máy Giặt',
        price: 11490000,
        oldPrice: 13990000,
        discount: 18,
        rating: 4.5,
        reviews: 201,
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
            'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=85'
        ],
        desc: 'Máy giặt Samsung AddWash 10kg, cửa phụ tiện lợi thêm đồ giữa chừng, vệ sinh lồng giặt tự động.',
        specs: {
            'Khối lượng giặt': '10 kg',
            'Loại': 'Cửa trước',
            'Công nghệ': 'AddWash + Digital Inverter',
            'Tốc độ vắt': '1400 vòng/phút',
            'Lồng giặt': 'Thép không gỉ',
            'Bảo hành': '2 năm toàn bộ, 10 năm motor'
        }
    },
    {
        id: 8,
        name: 'Samsung 43" 4K UHD Smart TV UA43AU7000',
        category: 'Tivi',
        price: 8990000,
        oldPrice: 10990000,
        discount: 18,
        rating: 4.3,
        reviews: 428,
        images: [
            'https://images.unsplash.com/photo-1593359677879-a4bb92f4e5cd?w=800&q=85',
            'https://images.unsplash.com/photo-1461151304267-38231e5f9571?w=800&q=85'
        ],
        desc: 'Smart TV Samsung 43" 4K UHD, hệ điều hành Tizen thông minh, hỗ trợ Netflix, YouTube, Disney+.',
        specs: {
            'Kích thước': '43 inch',
            'Độ phân giải': '3840 x 2160 (4K UHD)',
            'Hệ điều hành': 'Tizen',
            'HDR': 'HDR10+',
            'Kết nối': '3 HDMI, 2 USB, WiFi, Bluetooth',
            'Bảo hành': '2 năm chính hãng'
        }
    },
    {
        id: 9,
        name: 'LG 55" OLED 4K ThinQ AI OLED55C1PTB',
        category: 'Tivi',
        price: 28990000,
        oldPrice: 34990000,
        discount: 17,
        rating: 4.8,
        reviews: 156,
        images: [
            'https://images.unsplash.com/photo-1461151304267-38231e5f9571?w=800&q=85',
            'https://images.unsplash.com/photo-1593359677879-a4bb92f4e5cd?w=800&q=85'
        ],
        desc: 'LG OLED 55" 4K đỉnh cao với tấm nền OLED tự phát sáng, màu đen hoàn hảo, hình ảnh sống động nhất.',
        specs: {
            'Kích thước': '55 inch',
            'Tấm nền': 'OLED evo',
            'Độ phân giải': '3840 x 2160 (4K UHD)',
            'HDR': 'Dolby Vision, HDR10, HLG',
            'Kết nối': '4 HDMI 2.1, 3 USB, WiFi 6',
            'Bảo hành': '2 năm chính hãng'
        }
    },
    {
        id: 10,
        name: 'Panasonic 25L NN-ST34HMYUE',
        category: 'Lò Vi Sóng',
        price: 1890000,
        oldPrice: 2390000,
        discount: 21,
        rating: 4.1,
        reviews: 89,
        images: [
            'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=85',
            'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=85&sat=20'
        ],
        desc: 'Lò vi sóng Panasonic 25L công nghệ Inverter, làm nóng đều và giữ dưỡng chất tốt hơn lò thông thường.',
        specs: {
            'Dung tích': '25 Lít',
            'Công suất': '1000W',
            'Công nghệ': 'Inverter',
            'Chức năng': 'Hâm nóng, Nấu, Rã đông',
            'Loại': 'Lò đơn (không nướng)',
            'Bảo hành': '1 năm chính hãng'
        }
    },
    {
        id: 11,
        name: 'Sharp R-G372VN-S 25L',
        category: 'Lò Vi Sóng',
        price: 1490000,
        oldPrice: null,
        discount: null,
        rating: 3.9,
        reviews: 63,
        images: [
            'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=85&flip=h',
            'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=85'
        ],
        desc: 'Lò vi sóng Sharp 25L thiết kế gọn đẹp, 11 cấp độ công suất, phù hợp gia đình 3–5 người.',
        specs: {
            'Dung tích': '25 Lít',
            'Công suất': '900W',
            'Cấp độ': '11 cấp công suất',
            'Chức năng': 'Hâm nóng, Rã đông',
            'Loại': 'Lò đơn',
            'Bảo hành': '1 năm chính hãng'
        }
    },
    {
        id: 12,
        name: 'Aqua 130L AQR-T150FA(PK)',
        category: 'Tủ Lạnh',
        price: 3990000,
        oldPrice: 4690000,
        discount: 15,
        rating: 3.5,
        reviews: 112,
        images: [
            'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=85',
            'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=85'
        ],
        desc: 'Tủ lạnh Aqua 130L mini tiết kiệm điện, thiết kế nhỏ gọn phù hợp phòng trọ, văn phòng nhỏ.',
        specs: {
            'Dung tích': '130 Lít',
            'Loại': '1 cửa',
            'Màu sắc': 'Hồng pastel',
            'Tiết kiệm điện': '≤ 18 kWh/tháng',
            'Chức năng': 'Làm lạnh, Cấp đông',
            'Bảo hành': '2 năm chính hãng'
        }
    },
    {
        id: 13,
        name: 'Electrolux 8kg EWF8025CQWA',
        category: 'Máy Giặt',
        price: 6790000,
        oldPrice: 7990000,
        discount: 15,
        rating: 4.0,
        reviews: 144,
        images: [
            'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=85',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85'
        ],
        desc: 'Máy giặt Electrolux 8kg UltimateCare, hơi nước diệt khuẩn 99.9%, bảo vệ sợi vải tối đa.',
        specs: {
            'Khối lượng giặt': '8 kg',
            'Loại': 'Cửa trước',
            'Công nghệ': 'UltimateCare + Inverter',
            'Tốc độ vắt': '1200 vòng/phút',
            'Chức năng đặc biệt': 'Hơi nước diệt khuẩn',
            'Bảo hành': '2 năm toàn bộ, 10 năm motor'
        }
    }
];