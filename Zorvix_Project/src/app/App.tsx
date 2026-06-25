import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, ShoppingCart, Heart, User, Menu, X, Star, ChevronRight,
  TrendingUp, Package, BarChart2, Settings, Bell, Sun, Moon,
  ArrowRight, Shield, Truck, RefreshCw, Headphones, ChevronDown,
  Grid, List, Filter, SortDesc, Eye, Share2, Zap, Award,
  Home, Tag, LogIn, Store, LayoutDashboard, MessageSquare,
  DollarSign, Users, CheckCircle, Clock, AlertCircle, Plus,
  Minus, Trash2, MapPin, CreditCard, Lock, Globe, Mic,
  ThumbsUp, Upload, BarChart, PieChart, ShoppingBag, Box,
  Percent, Activity, ArrowUp, ArrowDown, ExternalLink, Hexagon, Bot, Smartphone
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart as ReBarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "shop" | "product" | "cart" | "wishlist" | "checkout"
  | "user-dashboard" | "seller-dashboard" | "admin-dashboard" | "about"
  | "contact" | "order-tracking" | "categories" | "login" | "register" | "generic";

interface Product {
  id: number; name: string; price: number; originalPrice: number;
  rating: number; reviews: number; image: string; category: string;
  seller: string; badge?: string; inStock: boolean; description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const products: Product[] = [
  { id: 1, name: "AirPods Pro Max Wireless", price: 549, originalPrice: 649, rating: 4.9, reviews: 12840, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format", category: "Electronics", seller: "Apple Store", badge: "Bestseller", inStock: true, description: "Premium wireless headphones with Active Noise Cancellation." },
  { id: 2, name: "Ultra Slim Laptop Pro 16\"", price: 1299, originalPrice: 1599, rating: 4.8, reviews: 8320, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format", category: "Electronics", seller: "TechVault", badge: "Hot Deal", inStock: true, description: "Blazing-fast M3 Pro chip with 20-hour battery life." },
  { id: 3, name: "Minimalist Leather Watch", price: 289, originalPrice: 399, rating: 4.7, reviews: 5640, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format", category: "Fashion", seller: "LuxeTime", badge: "New", inStock: true, description: "Swiss movement, genuine Italian leather strap." },
  { id: 4, name: "4K OLED Smart TV 55\"", price: 899, originalPrice: 1199, rating: 4.6, reviews: 3210, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=400&h=400&fit=crop&auto=format", category: "Electronics", seller: "HomeElite", inStock: true, description: "Dolby Vision & Atmos, 120Hz refresh rate." },
  { id: 5, name: "Designer Sneakers Limited", price: 185, originalPrice: 240, rating: 4.8, reviews: 9870, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format", category: "Fashion", seller: "StreetStyle", badge: "Limited", inStock: true, description: "Hand-crafted with premium suede and memory foam insole." },
  { id: 6, name: "Espresso Machine Pro", price: 459, originalPrice: 599, rating: 4.9, reviews: 7200, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&auto=format", category: "Home", seller: "CaféLux", inStock: true, description: "15-bar pressure pump, built-in grinder, milk frother." },
  { id: 7, name: "Mechanical Keyboard RGB", price: 149, originalPrice: 199, rating: 4.7, reviews: 4100, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&auto=format", category: "Electronics", seller: "TechVault", badge: "Top Rated", inStock: true, description: "Cherry MX switches, per-key RGB, aluminum frame." },
  { id: 8, name: "Yoga Mat Premium Cork", price: 79, originalPrice: 119, rating: 4.6, reviews: 2300, image: "https://images.unsplash.com/photo-1601925228730-c4bb8a0b8b1c?w=400&h=400&fit=crop&auto=format", category: "Sports", seller: "FitLife", inStock: true, description: "Sustainable cork surface, 6mm thick, non-slip base." },
];

const categories = [
  { name: "Electronics", icon: "⚡", count: 24500, image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop&auto=format", color: "#5b4ef8" },
  { name: "Fashion", icon: "👗", count: 18200, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop&auto=format", color: "#ff6b35" },
  { name: "Home & Living", icon: "🏠", count: 12400, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop&auto=format", color: "#06d6a0" },
  { name: "Sports", icon: "⚽", count: 8700, image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&h=200&fit=crop&auto=format", color: "#ffd166" },
  { name: "Beauty", icon: "💄", count: 9300, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=200&fit=crop&auto=format", color: "#e63946" },
  { name: "Books", icon: "📚", count: 5400, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&auto=format", color: "#7b6efb" },
];

const salesData = [
  { month: "Jan", sales: 42000, orders: 820, revenue: 38000 },
  { month: "Feb", sales: 51000, orders: 950, revenue: 46000 },
  { month: "Mar", sales: 47000, orders: 880, revenue: 42000 },
  { month: "Apr", sales: 63000, orders: 1100, revenue: 58000 },
  { month: "May", sales: 71000, orders: 1250, revenue: 65000 },
  { month: "Jun", sales: 84000, orders: 1420, revenue: 77000 },
  { month: "Jul", sales: 92000, orders: 1580, revenue: 85000 },
];

const adminStats = [
  { label: "Total Revenue", value: "$2.4M", change: "+18.2%", up: true, icon: DollarSign, color: "#5b4ef8" },
  { label: "Total Orders", value: "84,219", change: "+12.5%", up: true, icon: ShoppingBag, color: "#06d6a0" },
  { label: "Active Sellers", value: "3,847", change: "+8.1%", up: true, icon: Store, color: "#ff6b35" },
  { label: "Active Users", value: "142K", change: "+22.3%", up: true, icon: Users, color: "#ffd166" },
];

const pieData = [
  { name: "Electronics", value: 38, color: "#5b4ef8" },
  { name: "Fashion", value: 25, color: "#ff6b35" },
  { name: "Home", value: 18, color: "#06d6a0" },
  { name: "Sports", value: 12, color: "#ffd166" },
  { name: "Other", value: 7, color: "#e63946" },
];

// ─── Utilities ───────────────────────────────────────────────────────────────
const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ");

const LogoSymbol = ({ className = "" }: { className?: string }) => (
  <img src="/zorvix_logo.png" alt="Zorvix Logo" className={cn("shrink-0 object-cover rounded-xl", className)} />
);

const FlashSaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState(3600 * 2 + 45 * 60);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-3 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-red-500/30">
      <Clock className="w-4 h-4 animate-pulse" />
      <span className="font-bold whitespace-nowrap text-sm">Sale Ends In:</span>
      <div className="flex items-center gap-1 font-mono text-sm">
        <div className="bg-black/20 px-1.5 py-0.5 rounded">{hours.toString().padStart(2, '0')}</div>
        <span>:</span>
        <div className="bg-black/20 px-1.5 py-0.5 rounded">{minutes.toString().padStart(2, '0')}</div>
        <span>:</span>
        <div className="bg-black/20 px-1.5 py-0.5 rounded">{seconds.toString().padStart(2, '0')}</div>
      </div>
    </div>
  );
};

const StarRating = ({ rating, small }: { rating: number; small?: boolean }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <Star key={s} className={cn(small ? "w-3 h-3" : "w-4 h-4", s <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300")} />
    ))}
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, dark, setDark, cartCount, wishlistCount, isLoggedIn }:
  { page: Page; setPage: (p: Page) => void; dark: boolean; setDark: (d: boolean) => void; cartCount: number; wishlistCount: number; isLoggedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", page: "home" as Page },
    { label: "Shop", page: "shop" as Page },
    { label: "Categories", page: "categories" as Page },
    { label: "Sell", page: "seller-dashboard" as Page },
    { label: "About", page: "about" as Page },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "backdrop-blur-2xl bg-background/80 shadow-lg shadow-primary/5 border-b border-border" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setPage("home")} className="flex items-center gap-2 group">
            <LogoSymbol className="w-8 h-8 ring-2 ring-primary ring-offset-2 ring-offset-background dark:ring-offset-background transition-all group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Zor<span className="text-primary">vix</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <button key={l.label} onClick={() => setPage(l.page)}
                className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  page === l.page ? "bg-primary text-white shadow-md shadow-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Search + Actions */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {searchOpen && (
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products..." autoFocus
                    className="w-full px-3 py-1.5 text-sm rounded-lg bg-muted border border-border outline-none focus:border-primary transition-colors" />
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setPage("wishlist")} className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">{wishlistCount}</span>}
            </button>
            <button onClick={() => setPage("cart")} className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setPage(isLoggedIn ? "user-dashboard" : "login")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/30">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{isLoggedIn ? "Account" : "Login"}</span>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-muted">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(l => (
                <button key={l.label} onClick={() => { setPage(l.page); setMenuOpen(false); }}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium text-left transition-all",
                    page === l.page ? "bg-primary text-white" : "hover:bg-muted"
                  )}>
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── PWA Install Logic ────────────────────────────────────────────────────────
let deferredPrompt: any = null;
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
}

const handlePwaInstall = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    }
    deferredPrompt = null;
  } else {
    alert("To install the Native App on your device, look for the 'Install App' or 'Add to Home Screen' option in your browser menu! (Usually hidden in the Share menu on iOS/Safari, or the 3-dots menu on Android/Chrome).");
  }
};

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ setPage, addToCart, toggleWishlist, wishlist, setGenericPageTitle }:
  { setPage: (p: Page) => void; addToCart: (p: Product) => void; toggleWishlist: (id: number) => void; wishlist: number[]; setGenericPageTitle: (title: string) => void }) {

  const [activeSlide, setActiveSlide] = useState(0);
  const heroSlides = [
    { title: "Future of Shopping", subtitle: "AI-Powered Marketplace", desc: "Discover millions of products with personalized AI recommendations tailored just for you.", cta: "Explore Now", bg: "from-primary/20 via-transparent to-accent/10", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=500&fit=crop&auto=format" },
    { title: "Sell Anywhere", subtitle: "Multi-Vendor Platform", desc: "Launch your store in minutes. Reach millions of customers with our powerful seller tools.", cta: "Start Selling", bg: "from-accent/20 via-transparent to-primary/10", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop&auto=format" },
    { title: "Premium Deals", subtitle: "Up to 70% Off Today", desc: "Flash sales on top brands every hour. Never miss a deal with real-time price alerts.", cta: "Shop Deals", bg: "from-emerald-500/20 via-transparent to-primary/10", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&h=500&fit=crop&auto=format" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon: Shield, label: "Secure Payments", desc: "256-bit SSL encryption" },
    { icon: Truck, label: "Fast Delivery", desc: "Same-day in 50+ cities" },
    { icon: RefreshCw, label: "Easy Returns", desc: "30-day return policy" },
    { icon: Headphones, label: "24/7 Support", desc: "AI + human assistance" },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatePresence mode="wait">
                <motion.div key={activeSlide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                      <Zap className="w-3 h-3" />
                      {heroSlides[activeSlide].subtitle}
                    </div>
                    {activeSlide === 2 && <FlashSaleTimer />}
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>
                    {heroSlides[activeSlide].title.split(" ").map((w, i) => (
                      <span key={i} className={i === 1 ? "text-primary" : ""}>{w} </span>
                    ))}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">{heroSlides[activeSlide].desc}</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setPage("shop")}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5">
                      {heroSlides[activeSlide].cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => setPage("seller-dashboard")}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-muted transition-all">
                      <Store className="w-4 h-4" />
                      Become a Seller
                    </button>
                  </div>
                  <div className="flex items-center gap-6 mt-8">
                    <div><div className="text-2xl font-bold">142K+</div><div className="text-sm text-muted-foreground">Happy Customers</div></div>
                    <div className="w-px h-10 bg-border" />
                    <div><div className="text-2xl font-bold">3.8K+</div><div className="text-sm text-muted-foreground">Verified Sellers</div></div>
                    <div className="w-px h-10 bg-border" />
                    <div><div className="text-2xl font-bold">1M+</div><div className="text-sm text-muted-foreground">Products</div></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="hidden lg:block relative">
              <AnimatePresence mode="wait">
                <motion.div key={activeSlide} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-border">
                  <img src={heroSlides[activeSlide].img} alt="Hero" className="w-full h-[420px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent" />
                  {/* Floating card */}
                  <div className="absolute bottom-4 left-4 right-4 backdrop-blur-xl bg-card/80 border border-border rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground">AI Recommendation</div>
                        <div className="font-semibold text-sm mt-0.5">Based on your style</div>
                      </div>
                      <button className="px-3 py-1.5 bg-primary text-white text-xs rounded-lg font-medium">View All</button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* Slide dots */}
              <div className="flex justify-center gap-2 mt-4">
                {heroSlides.map((_, i) => (
                  <button key={i} onClick={() => setActiveSlide(i)}
                    className={cn("rounded-full transition-all", i === activeSlide ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/30")} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strips */}
      <section className="py-6 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{f.label}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Browse</div>
              <h2 className="text-3xl font-bold">Top Categories</h2>
            </div>
            <button onClick={() => setPage("categories")} className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <motion.button key={i} onClick={() => setPage("shop")}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                whileHover={{ y: -4 }} className="group relative rounded-2xl overflow-hidden aspect-square bg-muted border border-border hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-xl mb-0.5">{c.icon}</div>
                  <div className="text-white font-semibold text-sm">{c.name}</div>
                  <div className="text-white/60 text-xs">{c.count.toLocaleString()}+ items</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-accent p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-9xl">⚡</div>
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">Limited Time</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Flash Sale — Up to 70% Off</h2>
              <p className="text-white/70">Ends in: <span className="font-mono font-bold text-white">03:47:22</span></p>
            </div>
            <button onClick={() => setPage("shop")}
              className="px-8 py-3 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-all shadow-xl flex-shrink-0">
              Shop Flash Deals
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Curated</div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
            </div>
            <button onClick={() => setPage("shop")} className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} setPage={setPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlisted={wishlist.includes(p.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-blue-600 text-white p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-primary/20">
            <div className="flex-1 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Smartphone className="w-4 h-4" /> Zorvix App
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Shop seamlessly on your mobile device.
              </h2>
              <p className="text-white/80 text-lg max-w-lg leading-relaxed">
                Unlock exclusive mobile-only deals, enjoy lightning-fast checkout, and get real-time order tracking right in your pocket.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="/Zorvix.apk" download="Zorvix.apk" className="flex items-center gap-3 px-6 py-3.5 bg-black text-white rounded-xl hover:bg-zinc-900 transition-all shadow-xl hover:-translate-y-1 cursor-pointer">
                  <div className="text-left">
                    <div className="text-[10px] text-white/70 uppercase font-semibold">Install Native App</div>
                    <div className="font-bold text-sm">Download for Android</div>
                  </div>
                </a>
                <a href="/Zorvix.ipa" download="Zorvix.ipa" className="flex items-center gap-3 px-6 py-3.5 bg-black text-white rounded-xl hover:bg-zinc-900 transition-all shadow-xl hover:-translate-y-1 cursor-pointer">
                  <div className="text-left">
                    <div className="text-[10px] text-white/70 uppercase font-semibold">Install Native App</div>
                    <div className="font-bold text-sm">Download for iOS</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex-1 relative w-full flex justify-center lg:justify-end mt-8 md:mt-0">
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=800&fit=crop&auto=format" alt="Zorvix Mobile App" className="relative z-10 w-[240px] md:w-[280px] lg:w-[320px] rounded-[2rem] shadow-2xl shadow-black/40 border-[8px] border-zinc-900 rotate-[-5deg] hover:rotate-0 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* AI Feature Highlight */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Powered By AI</div>
            <h2 className="text-3xl font-bold mb-3">Intelligent Commerce</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our AI engine learns your preferences and delivers a hyper-personalized shopping experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🤖", title: "AI Chatbot", desc: "24/7 intelligent assistant that understands natural language and helps you find exactly what you need." },
              { icon: "🎯", title: "Smart Recommendations", desc: "Personalized product suggestions based on your browsing history, purchases, and style profile." },
              { icon: "📊", title: "Price Intelligence", desc: "Real-time price tracking with AI-powered alerts when your wishlist items drop in price." },
            ].map((item, i) => (
              <motion.button key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                onClick={() => { setGenericPageTitle(item.title); setPage("generic"); }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 group text-left w-full">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LogoSymbol className="w-7 h-7 ring-2 ring-primary ring-offset-2 ring-offset-background dark:ring-offset-background" />
                <span className="font-bold">Zorvix</span>
              </div>
              <p className="text-sm text-muted-foreground">The future of e-commerce. AI-powered, seller-friendly, customer-first.</p>
            </div>
            {[
              { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
              { title: "Support", links: ["Help Center", "Contact", "Returns", "Track Order"] },
              { title: "Legal", links: ["Privacy Policy", "Terms", "Cookie Policy", "Sitemap"] },
            ].map((col, i) => (
              <div key={i}>
                <div className="font-semibold text-sm mb-3">{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}>
                      <button onClick={() => {
                        if (l === "About Us") setPage("about");
                        else if (l === "Contact") setPage("contact");
                        else if (l === "Track Order") setPage("order-tracking");
                        else { setGenericPageTitle(l); setPage("generic"); }
                      }} className="text-sm text-muted-foreground hover:text-primary transition-colors text-left">{l}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© 2026 Zorvix. All rights reserved. <span className="hidden sm:inline px-2">|</span> Made by <span className="font-bold text-primary">RAJESH A</span></p>
            <div className="flex items-center gap-2">
              {["Razorpay", "Stripe", "PayPal", "UPI"].map(pm => (
                <span key={pm} className="px-2 py-1 text-xs bg-muted rounded border border-border font-mono">{pm}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index, setPage, addToCart, toggleWishlist, wishlisted }:
  { product: Product; index: number; setPage: (p: Page) => void; addToCart: (p: Product) => void; toggleWishlist: (id: number) => void; wishlisted: boolean }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1">
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {product.badge && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent text-white text-xs font-bold rounded-lg">{product.badge}</div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
          <button onClick={() => toggleWishlist(product.id)}
            className={cn("w-8 h-8 rounded-lg backdrop-blur-md border border-border flex items-center justify-center transition-colors shadow-sm",
              wishlisted ? "bg-accent text-white" : "bg-card/80 text-foreground hover:text-accent"
            )}>
            <Heart className={cn("w-4 h-4", wishlisted && "fill-current")} />
          </button>
          <button className="w-8 h-8 rounded-lg backdrop-blur-md bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors shadow-sm">
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={() => addToCart(product)}
            className="w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-muted-foreground mb-1">{product.seller}</div>
        <button onClick={() => setPage("product")} className="font-semibold text-sm leading-snug hover:text-primary transition-colors line-clamp-2 text-left w-full mb-2">
          {product.name}
        </button>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} small />
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">${product.price}</span>
          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">-{discount}%</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Shop Page ─────────────────────────────────────────────────────────────────
function ShopPage({ setPage, addToCart, toggleWishlist, wishlist }:
  { setPage: (p: Page) => void; addToCart: (p: Product) => void; toggleWishlist: (id: number) => void; wishlist: number[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("featured");
  const [selectedCat, setSelectedCat] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [search, setSearch] = useState("");

  const cats = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const filtered = products.filter(p =>
    (selectedCat === "All" || p.category === selectedCat) &&
    p.price >= priceRange[0] && p.price <= priceRange[1] &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-20 bg-card border border-border rounded-2xl p-5 space-y-6">
              <h3 className="font-bold text-lg flex items-center gap-2"><Filter className="w-4 h-4 text-primary" /> Filters</h3>
              <div>
                <div className="text-sm font-semibold mb-3">Search</div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted border border-border focus:border-primary outline-none transition-colors" />
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-3">Category</div>
                <div className="space-y-1">
                  {cats.map(c => (
                    <button key={c} onClick={() => setSelectedCat(c)}
                      className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedCat === c ? "bg-primary text-white font-medium" : "hover:bg-muted text-muted-foreground"
                      )}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-3">Price Range</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>${priceRange[0]}</span><span>—</span><span>${priceRange[1]}</span>
                </div>
                <input type="range" min={0} max={2000} value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold mb-3">Rating</div>
                {[4, 3, 2, 1].map(r => (
                  <button key={r} className="flex items-center gap-2 w-full py-1 hover:text-primary transition-colors text-sm">
                    <StarRating rating={r} small />
                    <span className="text-muted-foreground">& above</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">{filtered.length} products found</div>
              <div className="flex items-center gap-3">
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="text-sm px-3 py-2 rounded-lg bg-card border border-border outline-none focus:border-primary">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rated</option>
                </select>
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setView("grid")} className={cn("p-2 transition-colors", view === "grid" ? "bg-primary text-white" : "hover:bg-muted")}>
                    <Grid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setView("list")} className={cn("p-2 transition-colors", view === "list" ? "bg-primary text-white" : "hover:bg-muted")}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">No products found. Try adjusting your filters.</div>
            ) : (
              <div className={cn(view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" : "space-y-4")}>
                {filtered.map((p, i) => (
                  view === "grid"
                    ? <ProductCard key={p.id} product={p} index={i} setPage={setPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlisted={wishlist.includes(p.id)} />
                    : (
                      <div key={p.id} className="flex gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all">
                        <img src={p.image} alt={p.name} className="w-24 h-24 object-cover rounded-xl bg-muted flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold hover:text-primary cursor-pointer">{p.name}</div>
                          <div className="text-xs text-muted-foreground mb-1">{p.seller}</div>
                          <StarRating rating={p.rating} small />
                          <div className="flex items-center gap-3 mt-2">
                            <span className="font-bold">${p.price}</span>
                            <span className="text-sm text-muted-foreground line-through">${p.originalPrice}</span>
                            <button onClick={() => addToCart(p)} className="ml-auto px-4 py-1.5 bg-primary text-white text-sm rounded-lg font-medium hover:bg-primary/90 transition-colors">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Page ─────────────────────────────────────────────────────────────────
function CartPage({ cart, updateCart, removeFromCart, setPage }:
  { cart: { product: Product; qty: number }[]; updateCart: (id: number, qty: number) => void; removeFromCart: (id: number) => void; setPage: (p: Page) => void }) {
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 500 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
      <ShoppingCart className="w-16 h-16 text-muted-foreground/30" />
      <h2 className="text-2xl font-bold">Your cart is empty</h2>
      <p className="text-muted-foreground">Add some products to get started</p>
      <button onClick={() => setPage("shop")} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">Continue Shopping</button>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart <span className="text-muted-foreground text-xl font-normal">({cart.length} items)</span></h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product, qty }) => (
              <motion.div key={product.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 p-4 bg-card border border-border rounded-2xl">
                <img src={product.image} alt={product.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-muted flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold leading-snug line-clamp-2 mb-1">{product.name}</div>
                  <div className="text-sm text-muted-foreground mb-3">{product.seller}</div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateCart(product.id, Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-semibold w-6 text-center">{qty}</span>
                      <button onClick={() => updateCart(product.id, qty + 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">${(product.price * qty).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-20">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? <span className="text-emerald-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex gap-2 pt-2">
                <input placeholder="Coupon code" className="flex-1 px-3 py-2 text-sm rounded-lg bg-muted border border-border focus:border-primary outline-none" />
                <button className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">Apply</button>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => setPage("checkout")}
              className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> Secure Checkout
            </button>
            <button onClick={() => setPage("shop")} className="w-full mt-3 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Checkout Page ─────────────────────────────────────────────────────────────
function CheckoutPage({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("card");

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {[{ n: 1, label: "Address" }, { n: 2, label: "Payment" }, { n: 3, label: "Confirm" }].map(s => (
            <div key={s.n} className="flex items-center gap-3 flex-1">
              <button onClick={() => setStep(s.n)}
                className={cn("w-8 h-8 rounded-full font-semibold text-sm flex items-center justify-center transition-all",
                  step >= s.n ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-muted text-muted-foreground"
                )}>
                {step > s.n ? <CheckCircle className="w-4 h-4" /> : s.n}
              </button>
              <span className={cn("text-sm font-medium", step >= s.n ? "text-foreground" : "text-muted-foreground")}>{s.label}</span>
              {s.n < 3 && <div className={cn("flex-1 h-px", step > s.n ? "bg-primary" : "bg-border")} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Delivery Address</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[["First Name", "John"], ["Last Name", "Doe"], ["Email", "john@example.com"], ["Phone", "+1 234 567 8901"], ["Address", "123 Market Street"], ["City", "San Francisco"], ["State", "California"], ["ZIP", "94102"]].map(([label, ph]) => (
                  <div key={label} className={label === "Address" ? "sm:col-span-2" : ""}>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">{label}</label>
                    <input defaultValue={ph} className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
              Continue to Payment
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Payment Method</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { id: "card", label: "Card" },
                  { id: "upi", label: "UPI" },
                  { id: "paypal", label: "PayPal" },
                  { id: "wallet", label: "Wallet" },
                ].map(pm => (
                  <button key={pm.id} onClick={() => setPayMethod(pm.id)}
                    className={cn("p-3 rounded-xl border text-sm font-medium transition-all",
                      payMethod === pm.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
                    )}>
                    {pm.label}
                  </button>
                ))}
              </div>
              {payMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Card Number</label>
                    <input defaultValue="4242 4242 4242 4242" className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Expiry</label>
                      <input defaultValue="12/28" className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm font-mono" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">CVV</label>
                      <input defaultValue="***" className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm font-mono" />
                    </div>
                  </div>
                </div>
              )}
              {payMethod === "upi" && (
                <input defaultValue="user@upi" placeholder="Enter UPI ID" className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" />
              )}
            </div>
            <button onClick={() => setStep(3)} className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
              Review Order
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
              <p className="text-muted-foreground mb-4">Order #NX-847293 has been confirmed. Estimated delivery: Jun 25, 2026.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setPage("order-tracking")} className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
                  Track Order
                </button>
                <button onClick={() => setPage("home")} className="px-5 py-2.5 border border-border rounded-xl font-medium hover:bg-muted transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Order Tracking Page ──────────────────────────────────────────────────────
function OrderTrackingPage() {
  const steps = [
    { label: "Order Placed", time: "Jun 20, 9:12 AM", done: true, icon: CheckCircle },
    { label: "Payment Confirmed", time: "Jun 20, 9:15 AM", done: true, icon: CreditCard },
    { label: "Processing", time: "Jun 20, 2:00 PM", done: true, icon: Package },
    { label: "Shipped", time: "Jun 21, 10:30 AM", done: true, icon: Truck },
    { label: "Out for Delivery", time: "Jun 25 (Expected)", done: false, icon: MapPin },
    { label: "Delivered", time: "—", done: false, icon: Home },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground mb-8">Order #NX-847293</p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&auto=format" alt="Product" className="w-16 h-16 rounded-xl object-cover bg-muted" />
            <div>
              <div className="font-semibold">AirPods Pro Max Wireless</div>
              <div className="text-sm text-muted-foreground">Qty: 1 · $549.00</div>
              <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                <Truck className="w-3 h-3" /> In Transit
              </div>
            </div>
          </div>

          <div className="relative space-y-0">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all",
                    s.done ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-muted border border-border text-muted-foreground"
                  )}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  {i < steps.length - 1 && <div className={cn("w-0.5 h-8", s.done && steps[i + 1].done ? "bg-primary" : "bg-border")} />}
                </div>
                <div className="pb-8">
                  <div className={cn("font-medium text-sm", s.done ? "text-foreground" : "text-muted-foreground")}>{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Delivery Address</h3>
          <p className="text-sm text-muted-foreground">John Doe<br />123 Market Street, San Francisco, CA 94102</p>
        </div>
      </div>
    </div>
  );
}

// ─── Wishlist Page ─────────────────────────────────────────────────────────────
function WishlistPage({ wishlist, toggleWishlist, addToCart, setPage }:
  { wishlist: number[]; toggleWishlist: (id: number) => void; addToCart: (p: Product) => void; setPage: (p: Page) => void }) {
  const wishlisted = products.filter(p => wishlist.includes(p.id));

  if (wishlisted.length === 0) return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
      <Heart className="w-16 h-16 text-muted-foreground/30" />
      <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
      <button onClick={() => setPage("shop")} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">Discover Products</button>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Wishlist <span className="text-muted-foreground text-xl font-normal">({wishlisted.length})</span></h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlisted.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} setPage={setPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlisted />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── User Dashboard ───────────────────────────────────────────────────────────
function UserDashboard({ setPage }: { setPage: (p: Page) => void }) {
  const [tab, setTab] = useState("overview");
  const [profileForm, setProfileForm] = useState({
    "Full Name": "John Doe",
    "Email": "john@example.com",
    "Phone": "+1 234 567 8901",
    "Location": "San Francisco, CA"
  });
  const [saved, setSaved] = useState(false);

  const handleProfileSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  const tabs = ["overview", "orders", "wishlist", "profile", "settings"];

  const orders = [
    { id: "NX-847293", product: "AirPods Pro Max", date: "Jun 20, 2026", status: "In Transit", amount: "$549", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop&auto=format" },
    { id: "NX-831022", product: "Minimalist Leather Watch", date: "Jun 15, 2026", status: "Delivered", amount: "$289", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop&auto=format" },
    { id: "NX-810044", product: "Designer Sneakers Limited", date: "Jun 8, 2026", status: "Delivered", amount: "$185", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop&auto=format" },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">J</div>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">Premium Member · Joined Jun 2024</p>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Gold Member</span>
          </div>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all",
                tab === t ? "bg-primary text-white shadow-md shadow-primary/30" : "hover:bg-muted text-muted-foreground"
              )}>
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Orders", value: "24", icon: ShoppingBag, color: "primary" },
                { label: "Total Spent", value: "$2,840", icon: DollarSign, color: "accent" },
                { label: "Saved Items", value: "12", icon: Heart, color: "destructive" },
                { label: "Reward Points", value: "4,820", icon: Award, color: "chart-2" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5">
                  <div className="text-2xl font-bold mb-1">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {orders.map(o => (
                  <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                    <img src={o.img} alt={o.product} className="w-12 h-12 rounded-xl object-cover bg-muted" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{o.product}</div>
                      <div className="text-xs text-muted-foreground">{o.date} · {o.id}</div>
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                      o.status === "Delivered" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-primary/10 text-primary"
                    )}>{o.status}</span>
                    <span className="font-semibold text-sm">{o.amount}</span>
                    <button onClick={() => setPage("order-tracking")} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "orders" && (
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-4">All Orders</h3>
            <div className="space-y-3">
              {orders.map(o => (
                <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                  <img src={o.img} alt={o.product} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{o.product}</div>
                    <div className="text-xs text-muted-foreground">{o.id} · {o.date}</div>
                  </div>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                    o.status === "Delivered" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-primary/10 text-primary"
                  )}>{o.status}</span>
                  <span className="font-semibold">{o.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "profile" && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold mb-5">Profile Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(profileForm).map(([l, v]) => (
                <div key={l}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">{l}</label>
                  <input value={v} onChange={(e) => setProfileForm({ ...profileForm, [l]: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4">
              <button onClick={handleProfileSave} className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">Save Changes</button>
              {saved && <span className="text-sm text-emerald-600 font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Profile Updated!</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Seller Dashboard ─────────────────────────────────────────────────────────
function SellerDashboard() {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "products", "add-product", "orders", "analytics", "settings"];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-xl font-bold">T</div>
            <div>
              <h1 className="text-2xl font-bold">TechVault Store</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Verified Seller · 4.9★ · 2,340 sales</p>
            </div>
          </div>
          <button onClick={() => setTab("add-product")} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/30">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all",
                tab === t ? "bg-primary text-white shadow-md shadow-primary/30" : "hover:bg-muted text-muted-foreground"
              )}>
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Revenue (Jun)", value: "$84,220", change: "+18%", up: true },
                { label: "Total Orders", value: "1,420", change: "+12%", up: true },
                { label: "Active Products", value: "148", change: "+5", up: true },
                { label: "Avg. Rating", value: "4.92", change: "+0.03", up: true },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5">
                  <div className="text-2xl font-bold mb-1">{s.value}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                    <div className={cn("text-xs font-semibold flex items-center gap-0.5", s.up ? "text-emerald-600" : "text-destructive")}>
                      {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{s.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold mb-4">Sales Overview</h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="sellerGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5b4ef8" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#5b4ef8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                  <Area type="monotone" dataKey="sales" stroke="#5b4ef8" strokeWidth={2} fill="url(#sellerGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Top Products</h3>
                <div className="space-y-3">
                  {products.slice(0, 4).map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground w-4">#{i + 1}</span>
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.reviews} sales</div>
                      </div>
                      <span className="font-semibold text-sm">${p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {[
                    { id: "#2841", buyer: "Emma W.", amount: "$549", status: "Shipped" },
                    { id: "#2840", buyer: "Liam K.", amount: "$289", status: "Processing" },
                    { id: "#2839", buyer: "Sophia M.", amount: "$149", status: "Delivered" },
                    { id: "#2838", buyer: "Noah R.", amount: "$899", status: "Delivered" },
                  ].map(o => (
                    <div key={o.id} className="flex items-center justify-between py-1">
                      <div>
                        <div className="text-sm font-medium">{o.buyer}</div>
                        <div className="text-xs text-muted-foreground font-mono">{o.id}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                          o.status === "Delivered" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" :
                          o.status === "Shipped" ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                        )}>{o.status}</span>
                        <span className="font-semibold text-sm">{o.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <ReBarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                    <Bar dataKey="revenue" fill="#5b4ef8" radius={[6, 6, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Category Breakdown</h3>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="50%" height={200}>
                    <RePieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {pieData.map(d => (
                      <div key={d.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                        <span className="text-muted-foreground">{d.name}</span>
                        <span className="font-semibold ml-auto pl-3">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Product Inventory</h3>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                <Upload className="w-4 h-4" /> Bulk Upload
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Product", "Category", "Price", "Stock", "Sales", "Rating", "Status"].map(h => (
                      <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 6).map(p => (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover" />
                          <span className="font-medium truncate max-w-[160px]">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{p.category}</td>
                      <td className="py-3 px-2 font-semibold">${p.price}</td>
                      <td className="py-3 px-2 font-mono">{Math.floor(Math.random() * 200 + 10)}</td>
                      <td className="py-3 px-2 font-mono">{p.reviews}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{p.rating}</div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs rounded-full font-medium">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "add-product" && (
          <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl">
            <h3 className="font-bold mb-6 text-xl">Sell a New Product</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Product added successfully!"); setTab("products"); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1.5 block">Product Name</label>
                  <input required className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" placeholder="e.g. Wireless Headphones" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1.5 block">Description</label>
                  <textarea required rows={3} className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" placeholder="Describe your product..."></textarea>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Price ($)</label>
                  <input required type="number" min="0" step="0.01" className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Original Price ($)</label>
                  <input type="number" min="0" step="0.01" className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Category</label>
                  <select required className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm">
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Sports">Sports</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Stock Quantity</label>
                  <input required type="number" min="1" className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" placeholder="10" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1.5 block">Image URL</label>
                  <input required type="url" className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" placeholder="https://..." />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">Submit Product</button>
                <button type="button" onClick={() => setTab("products")} className="px-6 py-2.5 border border-border rounded-xl font-bold hover:bg-muted transition-all">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "users", "sellers", "orders", "products", "reports"];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Control Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Zorvix Platform — v2.4.1 · Last sync: just now</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl border border-border hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all",
                tab === t ? "bg-primary text-white shadow-md shadow-primary/30" : "hover:bg-muted text-muted-foreground"
              )}>
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {adminStats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -mr-5 -mt-5" style={{ background: s.color }} />
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20` }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <span className={cn("text-xs font-semibold flex items-center gap-0.5", s.up ? "text-emerald-600" : "text-destructive")}>
                      {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{s.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Platform Revenue</h3>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-lg">Last 7 months</span>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5b4ef8" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#5b4ef8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="adminGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff6b35" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#ff6b35" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                    <Area type="monotone" dataKey="revenue" stroke="#5b4ef8" strokeWidth={2} fill="url(#adminGrad)" />
                    <Area type="monotone" dataKey="orders" stroke="#ff6b35" strokeWidth={2} fill="url(#adminGrad2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Category Sales</h3>
                <div className="flex justify-center mb-4">
                  <ResponsiveContainer width="100%" height={180}>
                    <RePieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {pieData.map(d => (
                    <div key={d.name} className="flex items-center gap-2 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className="flex-1 text-muted-foreground">{d.name}</span>
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                      </div>
                      <span className="font-semibold w-8 text-right">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Pending Approvals</h3>
                <div className="space-y-3">
                  {[
                    { type: "Seller", name: "GadgetWorld Inc.", time: "2 hours ago", action: "KYC Review" },
                    { type: "Product", name: "Smart Watch Pro X2", time: "4 hours ago", action: "Content Review" },
                    { type: "Seller", name: "FashionHub Store", time: "6 hours ago", action: "KYC Review" },
                    { type: "Dispute", name: "Order #NX-830021", time: "1 day ago", action: "Resolution" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors">
                      <div className={cn("px-2 py-0.5 text-xs rounded-lg font-medium",
                        item.type === "Seller" ? "bg-primary/10 text-primary" :
                        item.type === "Product" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400" : "bg-destructive/10 text-destructive"
                      )}>{item.type}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                      <button className="px-2.5 py-1 bg-primary text-white text-xs rounded-lg font-medium hover:bg-primary/90 transition-colors">{item.action}</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Platform Activity</h3>
                <div className="space-y-3">
                  {[
                    { icon: Users, text: "847 new users registered today", time: "Live", color: "#5b4ef8" },
                    { icon: ShoppingBag, text: "1,240 orders placed in last 24h", time: "24h", color: "#06d6a0" },
                    { icon: Store, text: "12 new seller applications", time: "Today", color: "#ff6b35" },
                    { icon: AlertCircle, text: "3 disputes awaiting resolution", time: "Active", color: "#e63946" },
                    { icon: Activity, text: "Platform uptime 99.98%", time: "30d", color: "#06d6a0" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}18` }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-sm flex-1">{item.text}</span>
                      <span className="text-xs text-muted-foreground font-mono">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">User Management</h3>
              <div className="flex items-center gap-2">
                <input placeholder="Search users..." className="px-3 py-2 text-sm rounded-lg bg-muted border border-border focus:border-primary outline-none" />
                <button className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">Export</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["User", "Email", "Joined", "Orders", "Spent", "Status", "Action"].map(h => (
                      <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Emma Watson", email: "emma@example.com", joined: "Jan 2024", orders: 24, spent: "$2,840", status: "Active" },
                    { name: "Liam Chen", email: "liam@example.com", joined: "Mar 2024", orders: 18, spent: "$1,290", status: "Active" },
                    { name: "Sophia Park", email: "sophia@example.com", joined: "Jun 2024", orders: 7, spent: "$580", status: "Active" },
                    { name: "Noah Kim", email: "noah@example.com", joined: "Aug 2024", orders: 31, spent: "$4,120", status: "VIP" },
                    { name: "Ava Singh", email: "ava@example.com", joined: "Nov 2024", orders: 2, spent: "$95", status: "New" },
                  ].map((u, i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center text-white text-xs font-bold">{u.name[0]}</div>
                          <span className="font-medium">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{u.email}</td>
                      <td className="py-3 px-2 text-muted-foreground">{u.joined}</td>
                      <td className="py-3 px-2 font-mono">{u.orders}</td>
                      <td className="py-3 px-2 font-semibold">{u.spent}</td>
                      <td className="py-3 px-2">
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium",
                          u.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" :
                          u.status === "VIP" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400" : "bg-muted text-muted-foreground"
                        )}>{u.status}</span>
                      </td>
                      <td className="py-3 px-2">
                        <button className="text-xs text-primary hover:underline">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "sellers" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Approved Sellers", value: "3,847", color: "emerald" },
                { label: "Pending KYC", value: "128", color: "amber" },
                { label: "Suspended", value: "14", color: "red" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold mb-4">Pending Seller Approvals</h3>
              <div className="space-y-3">
                {[
                  { name: "GadgetWorld Inc.", category: "Electronics", applied: "Jun 20", docs: "Submitted", risk: "Low" },
                  { name: "FashionHub Store", category: "Fashion", applied: "Jun 19", docs: "Submitted", risk: "Medium" },
                  { name: "OrganicEats Co.", category: "Food", applied: "Jun 19", docs: "Pending", risk: "Low" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-sm">{s.name[0]}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.category} · Applied {s.applied}</div>
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                      s.docs === "Submitted" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                    )}>{s.docs}</span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                      s.risk === "Low" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                    )}>{s.risk} Risk</span>
                    <div className="flex gap-1">
                      <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg font-medium hover:bg-emerald-700 transition-colors">Approve</button>
                      <button className="px-3 py-1.5 bg-destructive/10 text-destructive text-xs rounded-lg font-medium hover:bg-destructive/20 transition-colors">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Categories Page ──────────────────────────────────────────────────────────
function CategoriesPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">All Categories</h1>
        <p className="text-muted-foreground mb-8">Explore our wide range of product categories</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <motion.button key={i} onClick={() => setPage("shop")}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}
              whileHover={{ y: -4 }} className="group relative rounded-2xl overflow-hidden aspect-video bg-muted border border-border hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/10">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="text-white font-bold">{c.name}</div>
                <div className="text-white/60 text-xs">{c.count.toLocaleString()}+ products</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <LogoSymbol className="w-10 h-10 ring-2 ring-primary ring-offset-4 ring-offset-background dark:ring-offset-background" />
            <span className="text-2xl font-bold">Zorvix</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Reimagining Commerce</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We believe shopping should be personal, seamless, and empowering for both buyers and sellers.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { value: "142K+", label: "Active Shoppers" },
            { value: "$2.4M", label: "Monthly GMV" },
            { value: "3,847", label: "Verified Sellers" },
          ].map((s, i) => (
            <div key={i} className="text-center p-6 bg-card border border-border rounded-2xl">
              <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-4">Zorvix was founded in 2023 with a singular vision: to build an AI-first marketplace that feels as personal as shopping at your favorite local store, but with the scale and reach of a global platform. We combine cutting-edge machine learning with a deep understanding of commerce to deliver experiences that delight both buyers and sellers.</p>
          <p className="text-muted-foreground leading-relaxed">Our platform empowers independent sellers to launch and scale their businesses, while giving shoppers access to millions of curated products with smart recommendations, competitive pricing, and seamless checkout — all under one roof.</p>
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
            Proudly designed and made by <span className="font-bold text-primary text-base">RAJESH A</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-muted-foreground">We'd love to hear from you. Our team is always here to help.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { icon: MessageSquare, title: "Live Chat", desc: "Chat with our AI support agent 24/7", action: "Start Chat" },
              { icon: Headphones, title: "Phone Support", desc: "+1 (800) ZORVIX", action: "Call Now" },
              { icon: Globe, title: "Help Center", desc: "Browse FAQs and guides", action: "Visit" },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.desc}</div>
                </div>
                <button className="text-sm text-primary font-medium hover:underline flex-shrink-0">{c.action}</button>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-5">Send a Message</h3>
            <div className="space-y-4">
              {[["Your Name", "John Doe"], ["Email Address", "john@example.com"], ["Subject", "How can we help?"]].map(([l, ph]) => (
                <div key={l}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">{l}</label>
                  <input placeholder={ph} className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-colors" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Message</label>
                <textarea rows={4} placeholder="Describe your issue or question..." className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm resize-none transition-colors" />
              </div>
              <button className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AI Chatbot ───────────────────────────────────────────────────────────────
function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm Zorvix AI. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: `I found some great options for "${userMsg}". Let me show you personalized recommendations based on your preferences and browsing history.` }]);
    }, 800);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-all">
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-card border border-border rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden">
            <div className="px-4 py-3 bg-primary flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/50 ring-offset-2 ring-offset-primary">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Zorvix AI</div>
                <div className="text-white/70 text-xs">Always here to help</div>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="h-60 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed",
                    m.role === "user" ? "bg-primary text-white" : "bg-muted"
                  )}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything…"
                className="flex-1 px-3 py-2 text-sm rounded-xl bg-muted border border-border focus:border-primary outline-none" />
              <button onClick={sendMessage} className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Auth Pages ───────────────────────────────────────────────────────────────
function LoginPage({ setPage, setIsLoggedIn }: { setPage: (p: Page) => void; setIsLoggedIn: (b: boolean) => void }) {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setPage("user-dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-2xl shadow-xl shadow-primary/5">
        <div className="text-center mb-8">
          <LogoSymbol className="w-12 h-12 mx-auto mb-4 ring-2 ring-primary ring-offset-4 ring-offset-background dark:ring-offset-background" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground text-sm mt-2">Sign in to your Zorvix account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" required className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-colors" placeholder="Enter your email" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 flex justify-between">
              <span>Password</span>
              <button type="button" className="text-primary hover:underline text-xs">Forgot password?</button>
            </label>
            <input type="password" required className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-colors" placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 mt-2">
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account? <button onClick={() => setPage("register")} className="text-primary font-medium hover:underline">Sign up</button>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ setPage, setIsLoggedIn }: { setPage: (p: Page) => void; setIsLoggedIn: (b: boolean) => void }) {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setPage("user-dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-2xl shadow-xl shadow-primary/5">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-muted-foreground text-sm mt-2">Join Zorvix today</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
            <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-colors" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" required className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-colors" placeholder="john@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <input type="password" required className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-colors" placeholder="Create a strong password" />
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 mt-2">
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <button onClick={() => setPage("login")} className="text-primary font-medium hover:underline">Sign in</button>
        </div>
      </div>
    </div>
  );
}

// ─── Generic Page ─────────────────────────────────────────────────────────────
function GenericPage({ title, setPage }: { title: string; setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center max-w-3xl mx-auto text-center px-4">
      <LogoSymbol className="w-20 h-20 mb-6 ring-4 ring-primary/20 ring-offset-4 ring-offset-background dark:ring-offset-background bg-primary/5" />
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground mb-8 max-w-lg leading-relaxed">
        This is a placeholder page for {title}. In a fully fledged application, this would contain detailed information regarding this section.
      </p>
      <button onClick={() => setPage("home")} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
        Back to Home
      </button>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [genericPageTitle, setGenericPageTitle] = useState("Page");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === p.id);
      if (existing) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, qty: 1 }];
    });
  };

  const updateCart = (id: number, qty: number) => {
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} setGenericPageTitle={setGenericPageTitle} />;
      case "shop": return <ShopPage setPage={setPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />;
      case "cart": return <CartPage cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} setPage={setPage} />;
      case "checkout": return <CheckoutPage setPage={setPage} />;
      case "wishlist": return <WishlistPage wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} setPage={setPage} />;
      case "order-tracking": return <OrderTrackingPage />;
      case "user-dashboard": return <UserDashboard setPage={setPage} />;
      case "seller-dashboard": return <SellerDashboard />;
      case "admin-dashboard": return <AdminDashboard />;
      case "categories": return <CategoriesPage setPage={setPage} />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "login": return <LoginPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} />;
      case "register": return <RegisterPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} />;
      case "generic": return <GenericPage title={genericPageTitle} setPage={setPage} />;
      default: return <HomePage setPage={setPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} setGenericPageTitle={setGenericPageTitle} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300" style={{ fontFamily: "Plus Jakarta Sans, Inter, system-ui, sans-serif" }}>
      <Navbar page={page} setPage={setPage} dark={dark} setDark={setDark} cartCount={cartCount} wishlistCount={wishlist.length} isLoggedIn={isLoggedIn} />
      <main>{renderPage()}</main>
      <AIChatbot />
    </div>
  );
}
