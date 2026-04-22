"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

// --- Types ---
type Category = "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Drinks";

interface MenuItem {
  id: number;
  name: string;
  category: Category;
  price: number;
  desc: string;
  img: string;
  tags?: string[];
  featured?: boolean;
}

const MENU_DATA: MenuItem[] = [
  { id: 1, category: "Breakfast", name: "Aussie Smashed Avo", price: 18, desc: "Heirloom tomatoes, feta, and poached eggs.", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80", tags: ["VG", "GF Available"] },
  { id: 2, category: "Breakfast", name: "Ricotta Hotcakes", price: 16, desc: "Honeycomb butter and seasonal berries.", img: "https://images.pexels.com/photos/32810338/pexels-photo-32810338.jpeg", featured: true },
  { id: 3, category: "Lunch", name: "Haven Wagyu Burger", price: 24, desc: "Truffle mayo, caramelized onions, and brioche.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", tags: ["Signature"] },
  { id: 4, category: "Lunch", name: "Barramundi Bowl", price: 24, desc: "Native greens, lemon myrtle, and smoked quinoa.", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80", tags: ["GF"] },
  { id: 5, category: "Dinner", name: "Roasted Lamb Rump", price: 32, desc: "Slow roasted with mint pea puree and jus.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", featured: true },
  { id: 6, category: "Dinner", name: "Charred Octopus", price: 28, desc: "Chorizo crumb and smoked paprika oil.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80" },
  { id: 7, category: "Snacks", name: "Truffle Parmesan Fries", price: 12, desc: "Double cooked with chive aioli dip.", img: "https://images.pexels.com/photos/32757022/pexels-photo-32757022.jpeg", tags: ["VG"] },
  { id: 8, category: "Drinks", name: "Yuzu Sparkling", price: 9, desc: "Hand-picked citrus from the valley.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80" },
];

export default function HavenMenu() {
  const router = useRouter();
  const [filter, setFilter] = useState<Category | "All">("All");
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const categories: (Category | "All")[] = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Drinks"];
  const filteredItems = MENU_DATA.filter(item => filter === "All" || item.category === filter);

  // Persistence logic
  useEffect(() => {
    const saved = localStorage.getItem("haven-cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("haven-cart", JSON.stringify(cart));
  }, [cart]);

  const updateQty = (id: number, delta: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        const newQty = existing.qty + delta;
        return newQty <= 0 
          ? prev.filter(item => item.id !== id) 
          : prev.map(item => item.id === id ? { ...item, qty: newQty } : item);
      }
      return delta > 0 ? [...prev, { id, qty: 1 }] : prev;
    });
  };

  const handleOrderAndRedirect = (id: number) => {
    // Add to cart state
    updateQty(id, 1);
    // Redirect to delivery page with selection ID
    router.push(`/delivery?selected=${id}`);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const p = MENU_DATA.find(product => product.id === item.id);
    return sum + (p?.price || 0) * item.qty;
  }, 0);

  return (
    <section ref={containerRef} className="bg-[#FAF9F6] min-h-screen relative font-sans text-stone-900 overflow-x-hidden selection:bg-[#C1643B] selection:text-white">
      
      {/* TEXTURE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 px-6 md:px-20 pt-16 max-w-400 mx-auto">
        
        {/* HERO SECTION */}
        <header className="mb-24">
          <motion.div style={{ y: yHero }} className="space-y-4">
            <span className="inline-block text-[#C1643B] font-mono text-[10px] uppercase tracking-[0.8em]">Concierge Delivery</span>
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85]"
              >

                <span className=" text-[#C1643B] ">Hotel</span> <span className="font-light font-serif">Menu</span>
              </motion.h1>
            </div>
          </motion.div>

          {/* FILTER NAVIGATION */}
          <div className="mt-16 border-b border-stone-200 pb-8 flex flex-col md:flex-row justify-between items-end gap-8">
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`group relative text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${filter === cat ? "text-[#C1643B]" : "text-stone-400 hover:text-stone-900"}`}
                >
                  {cat}
                </button>
              ))}
            </nav>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
              Curated Selections • {filteredItems.length} Items
            </p>
          </div>
        </header>

        {/* MENU GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 pb-40">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item, idx) => {
              const inCart = cart.find(c => c.id === item.id);
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                    opacity: { duration: 0.4 } 
                  }}
                  className={`group relative ${idx % 3 === 1 ? "lg:mt-20" : ""}`}
                >
                  {/* IMAGE CARD */}
                  <div className="relative aspect-4/5 mb-8 overflow-hidden rounded-[2.5rem] bg-stone-100 shadow-sm">
                    <motion.img 
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      src={item.img} 
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all"
                    />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10">
                      <div className="flex justify-end">
                        {item.featured && (
                          <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full">
                            Chef's Choice
                          </span>
                        )}
                      </div>
                      
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {inCart ? (
                          <div className="flex items-center justify-between bg-stone-900 text-white rounded-2xl p-2 backdrop-blur-md">
                            <button onClick={(e) => { e.stopPropagation(); updateQty(item.id, -1); }} className="w-10 h-10 hover:text-[#C1643B] transition-colors">-</button>
                            <span className="text-xs font-black">{inCart.qty}</span>
                            <button onClick={(e) => { e.stopPropagation(); updateQty(item.id, 1); }} className="w-10 h-10 hover:text-[#C1643B] transition-colors">+</button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleOrderAndRedirect(item.id)}
                            className="w-full bg-[#C1643B] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-stone-900 transition-colors"
                          >
                            Add to Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* INFO SECTION */}
                  <div className="px-2 space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">{item.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {item.tags?.map(tag => (
                            <span key={tag} className="text-[8px] font-bold uppercase text-stone-400 tracking-tighter border border-stone-200 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xl font-serif italic text-[#C1643B]">€{item.price}</span>
                    </div>
                    <div className="h-px w-full bg-stone-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out bg-linear-to-r from-[#C1643B] to-transparent" />
                    <p className="text-stone-500 text-sm leading-relaxed font-medium line-clamp-2">{item.desc}</p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FLOATING CART BUTTON (Redirects to Delivery) */}
      <AnimatePresence>
        {cartTotal > 0 && (
          <motion.button 
            onClick={() => router.push('/delivery')}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-10 right-10 z-60 bg-stone-900 text-white pl-8 pr-4 py-4 rounded-full shadow-2xl flex items-center gap-6 group hover:bg-[#C1643B] transition-colors"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Total Bill</span>
              <span className="text-xl font-black">€{cartTotal}</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center font-black text-sm">
              {cart.reduce((a, b) => a + b.qty, 0)}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 right-0 w-1/3 aspect-square bg-[#C1643B]/5 rounded-full blur-[120px] -z-10 translate-x-1/2 translate-y-1/2" />
    </section>
  );
}