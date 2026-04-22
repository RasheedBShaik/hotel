// components/Navbar.tsx
import RevealHeading from "./WritingHeading"; 
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* Restaurant Name/Logo */}
        <Link href="/" className="flex text-black items-center group">
          <RevealHeading 
            as="span" 
            className="text-3xl " 
            duration={1.5}
          >
            HOTEL
          </RevealHeading>
        </Link>

        {/* Navigation Links - Purely Food & Dining */}
        <div className="hidden md:flex items-center space-x-10 font-sans text-[13px] uppercase tracking-[0.2em] font-medium text-stone-800">
          <Link href="/" className="hover:text-stone-500 transition-colors">
            Home
          </Link>
          <Link href="/menu" className="hover:text-stone-500 transition-colors">
            Menu
          </Link>
          <Link href="/delivery" className="hover:text-stone-500 transition-colors">
            Delivery
          </Link>
          {/* Reservation CTA */}
          <Link 
            href="/reservations" 
            className="px-7 py-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 ease-in-out uppercase text-[11px] tracking-[0.2em]"
          >
            Reserve a Table
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button className="text-stone-900 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}