import Dashboard from "@pages/admin/Dashboard";
import { formatPrice } from "@utils/helper";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  Crown,
  Edit,
  Eye,
  Filter,
  Flame,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Sun,
  Target,
  Trash2,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Simulated data

export const chartData = [
  { name: "T1", orders: 65, revenue: 2400, customers: 45 },
  { name: "T2", orders: 89, revenue: 3200, customers: 67 },
  { name: "T3", orders: 123, revenue: 4100, customers: 89 },
  { name: "T4", orders: 156, revenue: 5200, customers: 112 },
  { name: "T5", orders: 134, revenue: 4800, customers: 98 },
  { name: "T6", orders: 178, revenue: 6100, customers: 134 },
  { name: "T7", orders: 198, revenue: 7200, customers: 156 },
];

export const pieData = [
  { name: "Điện thoại", value: 45, color: "#3B82F6" },
  { name: "Laptop", value: 25, color: "#10B981" },
  { name: "Phụ kiện", value: 20, color: "#F59E0B" },
  { name: "Khác", value: 10, color: "#EF4444" },
];

const recentOrders = [
  {
    id: "DH001",
    customer: "Nguyễn Văn A",
    product: "iPhone 15 Pro Max",
    amount: 29990000,
    status: "completed",
    time: "2 phút trước",
    priority: "high",
  },
  {
    id: "DH002",
    customer: "Trần Thị B",
    product: "Samsung Galaxy S24",
    amount: 22990000,
    status: "processing",
    time: "5 phút trước",
    priority: "medium",
  },
  {
    id: "DH003",
    customer: "Lê Văn C",
    product: "MacBook Air M3",
    amount: 28990000,
    status: "pending",
    time: "10 phút trước",
    priority: "low",
  },
];

const topProducts = [
  {
    name: "iPhone 15 Pro Max",
    sales: 234,
    revenue: 6800000000,
    growth: 85,
    trend: "up",
    badge: "🔥 Hot",
  },
  {
    name: "Samsung Galaxy S24",
    sales: 189,
    revenue: 4300000000,
    growth: 72,
    trend: "up",
    badge: "⭐ Top",
  },
  {
    name: "MacBook Air M3",
    sales: 156,
    revenue: 4500000000,
    growth: 68,
    trend: "stable",
    badge: "💎 Premium",
  },
  {
    name: "AirPods Pro 2",
    sales: 298,
    revenue: 1900000000,
    growth: 91,
    trend: "up",
    badge: "🚀 Trending",
  },
];

const products = [
  {
    id: "SP001",
    name: "iPhone 15 Pro Max 256GB",
    category: "Điện thoại",
    price: 29990000,
    originalPrice: 32990000,
    stock: 45,
    sold: 234,
    rating: 4.8,
    status: "active",
    featured: true,
  },
  {
    id: "SP002",
    name: "Samsung Galaxy S24 Ultra",
    category: "Điện thoại",
    price: 26990000,
    originalPrice: 29990000,
    stock: 23,
    sold: 189,
    rating: 4.7,
    status: "active",
    featured: false,
  },
  {
    id: "SP003",
    name: "MacBook Air M3 13 inch",
    category: "Laptop",
    price: 28990000,
    originalPrice: 31990000,
    stock: 0,
    sold: 156,
    rating: 4.9,
    status: "out_of_stock",
    featured: true,
  },
];
const generateRealtimeData = () => ({
  totalProducts: 2847 + Math.floor(Math.random() * 100),
  todayOrders: 156 + Math.floor(Math.random() * 50),
  newCustomers: 89 + Math.floor(Math.random() * 20),
  revenue: 125400000 + Math.floor(Math.random() * 10000000),
  onlineUsers: 1247 + Math.floor(Math.random() * 100),
  notifications: 12 + Math.floor(Math.random() * 5),
});
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [realtimeData, setRealtimeData] = useState(generateRealtimeData());
  const [searchTerm, setSearchTerm] = useState("");

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(generateRealtimeData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "text-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "products",
      label: "Sản phẩm",
      icon: Package,
      color: "text-green-500",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "orders",
      label: "Đơn hàng",
      icon: ShoppingCart,
      color: "text-orange-500",
      gradient: "from-orange-500 to-red-500",
      badge: realtimeData.notifications,
    },
    {
      id: "users",
      label: "Người dùng",
      icon: Users,
      color: "text-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "analytics",
      label: "Thống kê",
      icon: BarChart3,
      color: "text-pink-500",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: Settings,
      color: "text-gray-500",
      gradient: "from-gray-500 to-gray-600",
    },
  ];

  const getStatusBadge = (status, stock) => {
    if (status === "out_of_stock" || stock === 0) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="mr-1 h-3 w-3" />
          Hết hàng
        </span>
      );
    }
    if (stock < 20) {
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          <AlertCircle className="mr-1 h-3 w-3" />
          Sắp hết
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
        <CheckCircle className="mr-1 h-3 w-3" />
        Còn hàng
      </span>
    );
  };

  const stats = [
    {
      title: "Tổng sản phẩm",
      value: realtimeData.totalProducts.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Đơn hàng hôm nay",
      value: realtimeData.todayOrders.toLocaleString(),
      change: "+23.1%",
      trend: "up",
      icon: ShoppingCart,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      realtime: true,
    },
    {
      title: "Khách hàng mới",
      value: realtimeData.newCustomers.toLocaleString(),
      change: "-2.4%",
      trend: "down",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Doanh thu",
      value: `₫${(realtimeData.revenue / 1000000).toFixed(1)}M`,
      change: "+18.2%",
      trend: "up",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      realtime: true,
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 h-40 w-40 animate-pulse rounded-full bg-white blur-3xl" />
          <div
            className="absolute right-0 bottom-0 h-60 w-60 animate-pulse rounded-full bg-yellow-300 blur-3xl"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-32 w-32 animate-pulse rounded-full bg-pink-300 blur-3xl"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="mb-4 flex items-center space-x-3">
              <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="mb-2 text-4xl font-bold">
                  Chào mừng trở lại! 🎉
                </h1>
                <p className="text-lg text-orange-100">
                  Hôm nay bạn có {realtimeData.todayOrders} đơn hàng mới
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-400" />
                <span className="text-orange-100">Hệ thống hoạt động tốt</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-orange-100">
                  {realtimeData.onlineUsers} người đang online
                </span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <TrendingUp className="h-20 w-20 animate-bounce text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border-0 bg-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:bg-gray-800"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
            />

            {stat.realtime && (
              <div className="absolute top-3 right-3 h-3 w-3 animate-pulse rounded-full bg-green-500" />
            )}

            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </h3>
              <div
                className={`rounded-2xl p-3 ${stat.bgColor} transition-all duration-300 group-hover:scale-110`}
              >
                <stat.icon
                  className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                />
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="mb-2 text-3xl font-bold transition-all duration-300 group-hover:text-4xl">
                {stat.value}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                </div>
                {stat.realtime && (
                  <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    <Zap className="mr-1 h-3 w-3" />
                    Live
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="rounded-2xl border-0 bg-white shadow-xl lg:col-span-2 dark:bg-gray-800">
          <div className="border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center space-x-2 text-xl font-bold">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span>Doanh thu 7 ngày qua</span>
              </h3>
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-green-600 px-3 py-1 text-sm font-medium text-white">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +18.2%
              </span>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="rounded-2xl border-0 bg-white shadow-xl dark:bg-gray-800">
          <div className="border-b border-gray-200 p-6 dark:border-gray-700">
            <h3 className="flex items-center space-x-2 text-xl font-bold">
              <Target className="h-5 w-5 text-purple-500" />
              <span>Phân bố danh mục</span>
            </h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl border-0 bg-white shadow-xl dark:bg-gray-800">
          <div className="border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center space-x-2 text-xl font-bold">
                <ShoppingCart className="h-5 w-5 text-green-500" />
                <span>Đơn hàng gần đây</span>
              </h3>
              <button className="flex items-center space-x-2 rounded-lg px-3 py-1 text-sm text-blue-600 transition-colors duration-200 hover:bg-blue-100">
                <Eye className="h-4 w-4" />
                <span>Xem tất cả</span>
              </button>
            </div>
          </div>
          <div className="space-y-4 p-6">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="group flex items-center justify-between rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-4 transition-all duration-300 hover:shadow-lg dark:from-gray-800/50 dark:to-gray-700/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white shadow-lg">
                      {order.customer.charAt(0)}
                    </div>
                    <div
                      className={`absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                        order.priority === "high"
                          ? "bg-red-500"
                          : order.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="font-semibold transition-colors duration-200 group-hover:text-orange-600">
                      {order.customer}
                    </div>
                    <div className="text-sm text-gray-500">{order.product}</div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{order.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {formatPrice(order.amount)}
                  </div>
                  <div className="mt-1 flex items-center justify-end">
                    {getOrderStatusBadge(order.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-2xl border-0 bg-white shadow-xl dark:bg-gray-800">
          <div className="border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center space-x-2 text-xl font-bold">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Sản phẩm bán chạy</span>
              </h3>
              <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-6 p-6">
            {topProducts.map((product, index) => (
              <div key={index} className="group flex items-center space-x-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 shadow-lg transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-xs font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="font-semibold transition-colors duration-200 group-hover:text-orange-600">
                      {product.name}
                    </div>
                    <span className="inline-flex items-center rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-red-100 px-2 py-1 text-xs font-medium text-orange-700">
                      {product.badge}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {product.sales} đã bán • {formatPrice(product.revenue)}
                  </div>
                  <div className="mt-3 flex items-center">
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
                        style={{ width: `${product.growth}%` }}
                      />
                    </div>
                    <span className="ml-3 flex items-center space-x-1 text-sm font-medium">
                      <span>{product.growth}%</span>
                      {product.trend === "up" && (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2 flex items-center text-sm text-yellow-500">
                    <Star className="mr-1 h-4 w-4 fill-current" />
                    4.8
                  </div>
                  <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-orange-100 dark:hover:bg-orange-900/20">
                    <Eye className="h-4 w-4 text-orange-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border-0 bg-gradient-to-r from-gray-50 to-white shadow-xl dark:from-gray-800 dark:to-gray-900">
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <h3 className="flex items-center space-x-2 text-xl font-bold">
            <Zap className="h-5 w-5 text-orange-500" />
            <span>Thao tác nhanh</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <button className="flex h-24 flex-col items-center justify-center space-y-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl">
              <Package className="h-8 w-8" />
              <span className="font-medium">Thêm sản phẩm</span>
            </button>
            <button className="flex h-24 flex-col items-center justify-center space-y-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-green-700 hover:shadow-xl">
              <ShoppingCart className="h-8 w-8" />
              <span className="font-medium">Xử lý đơn hàng</span>
            </button>
            <button className="flex h-24 flex-col items-center justify-center space-y-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-purple-700 hover:shadow-xl">
              <Users className="h-8 w-8" />
              <span className="font-medium">Quản lý khách hàng</span>
            </button>
            <button className="flex h-24 flex-col items-center justify-center space-y-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-xl">
              <TrendingUp className="h-8 w-8" />
              <span className="font-medium">Xem báo cáo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-3xl font-bold text-transparent">
            Quản lý sản phẩm
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Quản lý toàn bộ sản phẩm trong cửa hàng của bạn
          </p>
        </div>
        <button className="flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-xl">
          <Plus className="h-5 w-5" />
          <span>Thêm sản phẩm mới</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tổng sản phẩm
              </p>
              <p className="text-3xl font-bold">2,847</p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-900/20">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Đã bán</p>
              <p className="text-3xl font-bold">1,234</p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3 dark:bg-green-900/20">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hết hàng
              </p>
              <p className="text-3xl font-bold">23</p>
            </div>
            <div className="rounded-2xl bg-red-100 p-3 dark:bg-red-900/20">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đánh giá TB
              </p>
              <p className="text-3xl font-bold">4.7</p>
            </div>
            <div className="rounded-2xl bg-yellow-100 p-3 dark:bg-yellow-900/20">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h3 className="text-xl font-bold">Danh sách sản phẩm</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <button className="flex items-center space-x-2 rounded-xl border border-gray-200 px-4 py-2 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                <Filter className="h-4 w-4" />
                <span>Lọc</span>
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Danh mục
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Giá
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Tồn kho
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Đã bán
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Đánh giá
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 shadow-lg" />
                        {product.featured && (
                          <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500">
                            <Star className="h-3 w-3 fill-current text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-semibold">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`font-medium ${product.stock < 20 ? "text-red-600" : "text-green-600"}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium">{product.sold}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="font-medium">{product.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product.status, product.stock)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/20">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-green-100 dark:hover:bg-green-900/20">
                        <Edit className="h-4 w-4 text-green-600" />
                      </button>
                      <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-red-100 dark:hover:bg-red-900/20">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return renderProducts();
      case "orders":
        return (
          <div className="py-20 text-center">
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold">Quản lý đơn hàng</h3>
            <p className="text-gray-500">Tính năng đang phát triển</p>
          </div>
        );
      case "users":
        return (
          <div className="py-20 text-center">
            <Users className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold">Quản lý người dùng</h3>
            <p className="text-gray-500">Tính năng đang phát triển</p>
          </div>
        );
      case "analytics":
        return (
          <div className="py-20 text-center">
            <BarChart3 className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold">Thống kê & Phân tích</h3>
            <p className="text-gray-500">Tính năng đang phát triển</p>
          </div>
        );
      case "settings":
        return (
          <div className="py-20 text-center">
            <Settings className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold">Cài đặt hệ thống</h3>
            <p className="text-gray-500">Tính năng đang phát triển</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "dark" : ""}`}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-orange-400/20 to-red-400/20 blur-3xl" />
          <div
            className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-gray-200/50 bg-white/80 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-in-out dark:border-gray-700/50 dark:bg-gray-900/80 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center justify-between border-b border-gray-200/50 p-6 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                    <Crown className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 animate-pulse rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <h1 className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-xl font-bold text-transparent">
                    Shopee Admin Pro
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900/20 dark:text-orange-200">
                      <Shield className="mr-1 h-3 w-3" />
                      Admin
                    </span>
                    <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                      <Activity className="mr-1 h-3 w-3" />
                      {realtimeData.onlineUsers} online
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 overflow-y-auto p-4">
              {menuItems.map((item, index) => (
                <div key={item.id} className="group relative">
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`group relative flex w-full items-center space-x-4 overflow-hidden rounded-2xl px-4 py-4 transition-all duration-300 ${
                      currentPage === item.id
                        ? `bg-gradient-to-r ${item.gradient} scale-105 transform text-white shadow-xl`
                        : "text-gray-600 hover:scale-102 hover:bg-gray-100/80 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white"
                    }`}
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                    <div className="relative z-10 flex w-full cursor-pointer items-center space-x-4">
                      <div
                        className={`cursor-pointer rounded-xl p-2 transition-all duration-300 ${
                          currentPage === item.id
                            ? "bg-white/20 shadow-lg"
                            : `bg-gray-100 group-hover:bg-gradient-to-r dark:bg-gray-800 group-hover:${item.gradient} group-hover:text-white`
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 transition-all duration-300 ${
                            currentPage === item.id ? "text-white" : item.color
                          } group-hover:scale-110`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{item.label}</div>
                      </div>
                      {item.badge && (
                        <span className="inline-flex animate-pulse items-center rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-500 ${sidebarOpen ? "ml-72" : "ml-0"}`}
        >
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-xl p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {sidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>

                <div className="group relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 transition-colors duration-300 group-hover:text-orange-500" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm... (Ctrl+K)"
                    onClick={() => setShowCommandPalette(true)}
                    className="w-96 rounded-xl border-0 bg-gray-50/80 py-2 pr-20 pl-10 transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-800/50"
                  />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                    <span className="inline-flex items-center rounded border border-gray-200 px-2 py-1 text-xs">
                      ⌘K
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Performance Indicator */}
                <div className="hidden items-center space-x-2 rounded-full bg-green-100 px-3 py-1 md:flex dark:bg-green-900/20">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">
                    99.9% Uptime
                  </span>
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-xl p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-blue-500" />
                  )}
                </button>

                {/* Messages */}
                <button className="relative rounded-xl p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                    3
                  </span>
                </button>

                {/* Notifications */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-xl p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Bell className="h-5 w-5" />
                  {realtimeData.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {realtimeData.notifications > 99
                        ? "99+"
                        : realtimeData.notifications}
                    </span>
                  )}
                </button>

                {/* User Menu */}
                <div className="group relative">
                  <button className="flex items-center space-x-3 rounded-xl p-2 transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-bold text-white shadow-lg">
                        AD
                      </div>
                      <div className="absolute -right-1 -bottom-1 h-4 w-4 animate-pulse rounded-full border-2 border-white bg-green-500" />
                    </div>
                    <div className="hidden text-left md:block">
                      <div className="flex items-center text-sm font-medium">
                        Admin User
                        <Sparkles className="ml-1 h-3 w-3 text-yellow-500" />
                      </div>
                      <div className="text-xs text-gray-500">
                        admin@shopee.vn
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="relative z-10 p-6">{renderContent()}</main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
