"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#FAF9F6] border-t border-stone-200 pt-24 pb-12 overflow-hidden">
      {/* Texture Overlay to match the Menu page */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 mx-auto w-full px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12">
          
          {/* 1. Brand Identity */}
          <div className="md:col-span-5 lg:col-span-6">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-6xl font-black tracking-tighter uppercase mb-8 text-stone-900 leading-none"
            >
              The<br />
              <span className="italic text-[#C1643B] font-serif font-light lowercase">Hotel</span>
            </motion.h2>
            <p className="text-stone-500 max-w-sm font-medium leading-relaxed mb-10 text-sm">
              Premium concierge delivery and Australian-inspired brunch, 
              curated for the modern traveler. Flavor, craft, and connection delivered to your door.
            </p>
            <div className="flex gap-8">
              {["Instagram", "Facebook", "TripAdvisor"].map((social) => (
                <Link 
                  key={social} 
                  href="#" 
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-[#C1643B] transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">
              Navigate
            </h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-stone-600">
              <li><Link href="/" className="hover:text-[#C1643B] transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:text-[#C1643B] transition-colors">The Menu</Link></li>
              <li><Link href="/delivery" className="hover:text-[#C1643B] transition-colors">Delivery</Link></li>
              <li><Link href="/reservations" className="hover:text-[#C1643B] transition-colors">Reservation</Link></li>
            </ul>
          </div>

          {/* 3. Location & Hours */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">
              Visit Us
            </h4>
            <address className="not-italic text-sm text-stone-600 space-y-6 font-medium">
              <p className="leading-relaxed">
                5 Rue de la Poste<br />
                74000 Annecy, France
              </p>
              <div className="space-y-1">
                <p className="text-stone-900 font-bold uppercase text-[10px] tracking-widest">Service Hours</p>
                <p className="text-stone-500">Mon — Sun: 8:30 AM — 6:00 PM</p>
              </div>
            </address>
          </div>

          {/* 4. Contact */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">
              Concierge
            </h4>
            <a 
              href="mailto:hello@haven-annecy.fr" 
              className="text-sm font-bold text-stone-900 block group"
            >
              Contact Support
              <span className="block h-px w-full bg-stone-200 mt-2 group-hover:bg-[#C1643B] transition-colors" />
            </a>
            <p className="mt-4 text-[11px] text-stone-400 italic">Expected reply: &lt; 15 mins</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[9px] font-mono text-stone-400 uppercase tracking-[0.3em]">
            © {currentYear} Haven Annecy — Built for the Journey
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[9px] font-mono text-stone-400 uppercase tracking-widest hover:text-stone-900 transition-colors">
              Terms & Privacy
            </Link>
            
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[9px] font-black text-stone-600 uppercase tracking-widest">
                Kitchen Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}