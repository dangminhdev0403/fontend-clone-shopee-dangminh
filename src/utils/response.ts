export type ApiResponseDefault<T = unknown> = {
  status: number;
  error: string | null;
  message: string | object;
  data: T;
};

export const filters = [
  {
    id: "121313",
    filter: {
      name: "Theo Danh Mục",
      value: [
        {
          id: "12131",
          value: "Viết Máy & Mực (169)",
        },
        {
          id: "121131",
          value: "Viết Máy & Mực2 (169)",
        },
      ],
    },
  },
  {
    id: "12112313",
    filter: {
      name: "Nơi bán",
      value: [
        {
          id: "12131",
          value: "Hà nội",
        },
        {
          id: "121131",
          value: "Thái bình",
        },
      ],
    },
  },
];

export const products = [
  {
    id: 1,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: " Sản phẩm siêu hot đang giảm giá sốc, cơ hội cuối cùng để mua được giá rẻ như thế này!",
    price: 100000,
  },
  {
    id: 2,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm2",
    price: 100000,
  },
  {
    id: 3,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm3",
    price: 100000,
  },
  {
    id: 4,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm",
    price: 100000,
  },
  {
    id: 51,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm",
    price: 100000,
  },
  {
    id: 49,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm",
    price: 100000,
  },
  {
    id: 15,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm",
    price: 100000,
  },
  {
    id: 114,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm",
    price: 100000,
  },
  {
    id: 52,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm",
    price: 100000,
  },
  {
    id: 45,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm",
    price: 100000,
  },
  {
    id: 510,
    img: "https://inoceramic.vn/public/uploads/Sanpham/coc-su-quai-tai-lun-20-coc-su-dep-mau-cam-lsm-n022a.jpg",
    name: "Sản phẩm",
    price: 100000,
  },
];

export const sorts = [
  {
    id: "lienquan",
    value: "Liên quan",
  },
  {
    id: "baoloi",
    value: "Mới nhất",
  },
  {
    id: "banchay",
    value: "Bán chạy",
  },
];
