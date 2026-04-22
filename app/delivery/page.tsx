"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// --- Types ---
type Category = "All" | "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Drinks";

interface MenuItem {
  id: number;
  name: string;
  category: Category;
  price: number;
  desc: string;
  img: string;
}

// --- Menu Data ---
const MENU_ITEMS: MenuItem[] = [
  { id: 1, category: "Breakfast", name: "Avocado Sourdough", price: 18, desc: "Poached eggs, dukkah, and chili oil.", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80" },
  { id: 2, category: "Lunch", name: "Haven Wagyu Burger", price: 24, desc: "Truffle mayo, caramelized onions, brioche.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
  { id: 3, category: "Dinner", name: "Roasted Barramundi", price: 28, desc: "Native greens, lemon myrtle, smoked quinoa.", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80" },
  { id: 4, category: "Snacks", name: "Truffle Parmesan Fries", price: 12, desc: "Double cooked with chive aioli dip.", img: "https://images.pexels.com/photos/32757022/pexels-photo-32757022.jpeg" },
  { id: 5, category: "Snacks", name: "Burrata & Heirloom", price: 16, desc: "Balsamic pearls and basil oil drizzle.", img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=80" },
  { id: 6, category: "Drinks", name: "Iced Hibiscus Tea", price: 8, desc: "Cold-pressed with wild berries.", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80" },
  { id: 7, category: "Dinner", name: "Wild Mushroom Risotto", price: 26, desc: "Aged parmesan and truffle essence.", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80" },
  { id: 8, category: "Breakfast", name: "Acai Berry Bowl", price: 15, desc: "Organic granola, honey, and fresh dragonfruit.", img: "https://images.unsplash.com/photo-1199042730030-f42f53488737?w=800&q=80" },
];

export default function EasyDeliveryPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Define the ref
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Initialize useScroll with the container ref
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 3. Define transforms (These are safe to define at top level)
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  useEffect(() => {
    const savedCart = localStorage.getItem("haven-cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("haven-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdate"));
    }
  }, [cart, isHydrated]);

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        const newQty = existing.qty + delta;
        return newQty <= 0 
          ? prev.filter((item) => item.id !== id) 
          : prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item));
      }
      return delta > 0 ? [...prev, { id, qty: 1 }] : prev;
    });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCheckoutForm(false);
    setShowSuccess(true);
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = MENU_ITEMS.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.qty;
  }, 0);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // IMPORTANT: We must still return a wrapper with the ref even during 
  // non-hydration to satisfy Framer Motion's check.
  if (!isHydrated) {
    return <div ref={containerRef} className="min-h-screen bg-[#FAF9F6]" />;
  }

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen font-sans text-stone-900 pb-20 relative overflow-x-hidden">
      
      {/* HEADER */}
      <header className="px-6 pt-20 mb-12 max-w-7xl mx-auto">
        <motion.div style={{ y: yHero }} className="space-y-4">
          <span className="inline-block text-[#C1643B] font-mono text-[10px] uppercase tracking-[0.8em]">Concierge Delivery</span>
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85]"
            >
              <span className=" text-[#C1643B] ">Hotel</span> <span className="font-light">TO</span> <span className="font-light font-serif">HOME</span>
            </motion.h1>
          </div>
        </motion.div>
      </header>

      {/* FILTER BAR (Added for completeness) */}
      <div className="px-6 max-w-7xl mx-auto mb-12 flex gap-4 overflow-x-auto no-scrollbar">
        {["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Drinks"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as Category)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
              filter === cat ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-400 border-stone-100 hover:border-stone-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ITEMS GRID */}
      <main className="px-6 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {MENU_ITEMS.filter(i => filter === "All" || i.category === filter).map((item) => {
              const inCart = cart.find(c => c.id === item.id);
              return (
                <motion.div 
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item.id} 
                  className="bg-white rounded-[2.5rem] p-4 border border-stone-100 group shadow-sm"
                >
                  <div className="relative aspect-square overflow-hidden rounded-4xl] mb-6">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="px-3">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-lg font-black uppercase tracking-tight">{item.name}</h3>
                      <span className="text-[#C1643B] font-serif italic text-lg">€{item.price}</span>
                    </div>
                    <p className="text-stone-400 text-xs mb-8 line-clamp-2">{item.desc}</p>
                    
                    {inCart ? (
                      <div className="flex items-center justify-between bg-stone-900 text-white rounded-2xl p-1.5">
                        <button onClick={() => updateQty(item.id, -1)} className="w-10 h-10 hover:text-[#C1643B]">-</button>
                        <span className="text-xs font-black">{inCart.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-10 h-10 hover:text-[#C1643B]">+</button>
                      </div>
                    ) : (
                      <button onClick={() => updateQty(item.id, 1)} className="w-full py-4 bg-stone-50 text-stone-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-stone-900 hover:text-white transition-all">
                        Add to Order
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* FLOATING BAG BUTTON */}
        <AnimatePresence>
          {cartCount > 0 && !isCartOpen && (
            <motion.button 
              initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0 }}
              onClick={() => setIsCartOpen(true)}
              className="fixed bottom-10 right-10 bg-stone-900 text-white p-6 rounded-full shadow-2xl z-50 flex items-center gap-4 hover:bg-[#C1643B] transition-colors"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-black uppercase tracking-widest mb-1">Total Bill</span>
                <span className="text-xl font-black">€{cartTotal}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                {cartCount}
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </main>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-100" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-110 shadow-2xl p-10 flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Review Selection</p>
                <button onClick={() => setIsCartOpen(false)} className="font-bold text-xl hover:rotate-90 transition-transform">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar">
                {cart.map((item) => {
                  const product = MENU_ITEMS.find(p => p.id === item.id)!;
                  return (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={product.img} className="w-16 h-16 rounded-2xl object-cover" />
                      <div className="flex-1">
                        <p className="text-[11px] font-bold uppercase mb-1">{product.name}</p>
                        <p className="font-serif italic text-[#C1643B]">€{product.price * item.qty}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-stone-50 px-3 py-2 rounded-xl">
                        <button onClick={() => updateQty(item.id, -1)} className="text-xs font-bold hover:text-[#C1643B]">-</button>
                        <span className="text-[10px] font-black w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="text-xs font-bold hover:text-[#C1643B]">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-stone-100 pt-10 mt-auto">
                <div className="flex justify-between items-baseline mb-8 px-2">
                  <span className="text-[10px] font-bold uppercase text-stone-400">Checkout Total</span>
                  <span className="text-4xl font-black tracking-tighter">€{cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setShowCheckoutForm(true); }}
                  className="w-full bg-stone-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#C1643B] shadow-xl transition-all"
                >
                  Finalize Order
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CHECKOUT FORM & SUCCESS MODAL */}
      <AnimatePresence>
        {showCheckoutForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-200 bg-white overflow-y-auto p-6 md:p-20">
            <div className="max-w-xl mx-auto">
              <button onClick={() => setShowCheckoutForm(false)} className="mb-12 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-black transition-colors">← Back to Menu</button>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Delivery <span className="italic font-serif font-light text-[#C1643B]">Details</span></h2>
              <p className="text-stone-400 text-sm mb-12">Please provide your room or residence information.</p>
              
              <form className="space-y-8" onSubmit={handleOrderSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Full Name</label>
                  <input type="text" required className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-[#C1643B] bg-transparent transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Delivery Address / Room No.</label>
                  <input type="text" required className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-[#C1643B] bg-transparent transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Phone Number</label>
                    <input type="tel" required className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-[#C1643B] bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Special Notes</label>
                    <input type="text" className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-[#C1643B] bg-transparent transition-colors" placeholder="e.g. Extra napkins" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#C1643B] text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-stone-900 transition-all">
                  Place Order — €{cartTotal}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-300 bg-stone-900/90 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white p-12 rounded-[3rem] max-w-sm w-full text-center shadow-2xl">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">✓</div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Confirmed!</h3>
              <p className="text-stone-500 text-sm mb-10 leading-relaxed">Your order is being prepared by our chefs at <span className="text-stone-900 font-bold">The Hotel</span>.</p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#C1643B] transition-colors"
              >
                Return to Menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}