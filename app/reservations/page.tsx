"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// --- Types ---
interface Table {
    id: string;
    size: 2 | 4 | 6;
    status: "available" | "reserved";
}

const generateTables = (): Table[] => Array.from({ length: 50 }, (_, i) => {
    const id = i + 1;
    const size = id % 7 === 0 ? 6 : id % 3 === 0 ? 4 : 2;
    return {
        id: `${id}`,
        size: size as 2 | 4 | 6,
        status: Math.random() > 0.9 ? "reserved" : "available",
    };
});

const TABLES_DATA = generateTables();
const MIN_HOUR = 8;
const MAX_HOUR = 23;

export default function BookingPage() {
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
    const [arrivalHour, setArrivalHour] = useState<number>(18);
    const [exitHour, setExitHour] = useState<number>(20);
    const [bookingDate, setBookingDate] = useState(new Date().toISOString().split("T")[0]);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // 1. Hydration State to prevent the "Ref not hydrated" error
    const [isHydrated, setIsHydrated] = useState(false);

    // 2. Define the Scroll Target Ref
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // 3. Cinematic Hero Transforms
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const selectedTable = TABLES_DATA.find(t => t.id === selectedTableId);

    const formatHour = (hour: number) => {
        const period = hour >= 12 ? "PM" : "AM";
        let h = hour % 12 || 12;
        if (hour === 24) h = 12;
        return `${h}:00 ${period}`;
    };

    const handleArrivalChange = (val: number) => {
        setArrivalHour(val);
        if (val >= exitHour) setExitHour(val + 1);
    };

    // Return a shell during hydration to ensure the ref is ready when Framer checks it
    if (!isHydrated) return <div ref={containerRef} className="min-h-screen bg-[#FAF9F6]" />;

    return (
        <section ref={containerRef} className="bg-[#FAF9F6] min-h-screen text-slate-900 pb-24 font-sans relative overflow-x-hidden">
            
            {/* NOISE OVERLAY */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* CINEMATIC HERO SECTION */}
            <header className="relative z-10 px-6 md:px-20 pt-20 max-w-7xl mx-auto mb-20">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="space-y-6">
                    <span className="inline-block text-[#C1643B] font-mono text-[10px] uppercase tracking-[0.8em]">
                        The Haven Reservation
                    </span>
                    <div className="overflow-hidden">
                        <motion.h1 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-7xl md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] text-slate-900"
                        >
                            Select <br />
                            <span className="font-light font-serif text-[#C1643B]">Your Table</span>
                        </motion.h1>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 pt-4"
                    >
                        <p className="text-slate-400 text-[10px] max-w-50 uppercase tracking-widest font-bold leading-relaxed">
                            Live floor map availability. <br />
                            Secured placement for members.
                        </p>
                        <div className="flex gap-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-slate-300">Capacity</span>
                                <span className="text-xl font-light italic">250 Guests</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-slate-300">Location</span>
                                <span className="text-xl font-light italic">Main Hall</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </header>

            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* INTERACTIVE TABLE GRID */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                                Floor Map
                            </h2>
                            <div className="flex gap-4 text-[9px] font-bold uppercase">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-slate-200" /> Open
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#C1643B]" /> Occupied
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar pb-10">
                            {TABLES_DATA.map((table) => (
                                <motion.button
                                    whileHover={{ y: table.status === 'reserved' ? 0 : -4 }}
                                    key={table.id}
                                    disabled={table.status === 'reserved'}
                                    onClick={() => setSelectedTableId(table.id)}
                                    className={`
                                        ${table.size === 6 ? 'sm:col-span-2 h-40' : table.size === 4 ? 'h-32' : 'h-28'}
                                        relative rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center justify-center gap-3
                                        ${table.status === 'reserved' ? 'bg-slate-50/50 border-slate-100 cursor-not-allowed opacity-20' : 
                                          selectedTableId === table.id ? 'bg-white border-[#C1643B] shadow-2xl ring-1 ring-[#C1643B]' : 'bg-white border-slate-200 hover:border-slate-400 shadow-sm'}
                                    `}
                                >
                                    <span className={`text-[10px] font-black ${selectedTableId === table.id ? 'text-[#C1643B]' : 'text-slate-400'}`}>
                                        T-{table.id.padStart(2, '0')}
                                    </span>
                                    
                                    <div className="flex gap-2">
                                        {[...Array(table.size)].map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-500 ${selectedTableId === table.id ? 'bg-[#C1643B]' : 'bg-slate-300'}`} />
                                        ))}
                                    </div>

                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                        {table.size} People
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* RESERVATION SIDEBAR */}
                    <aside className="lg:col-span-5">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl space-y-10 sticky top-10"
                        >
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Date Selection</label>
                                    <input 
                                        type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C1643B]/20 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Arrival</label>
                                        <span className="text-lg font-serif italic text-[#C1643B]">{formatHour(arrivalHour)}</span>
                                    </div>
                                    <input 
                                        type="range" min={MIN_HOUR} max={MAX_HOUR - 1}
                                        value={arrivalHour} onChange={(e) => handleArrivalChange(parseInt(e.target.value))}
                                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Departure</label>
                                        <span className="text-lg font-bold text-slate-900">{formatHour(exitHour)}</span>
                                    </div>
                                    <input 
                                        type="range" min={arrivalHour + 1} max={MAX_HOUR}
                                        value={exitHour} onChange={(e) => setExitHour(parseInt(e.target.value))}
                                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#C1643B]"
                                    />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-50 space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Guests</p>
                                        <p className="text-2xl font-black tracking-tighter">
                                            {selectedTable ? `${selectedTable.size} People` : "—"}
                                        </p>
                                    </div>
                                    {selectedTableId && (
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Position</p>
                                            <p className="text-xl font-serif italic text-[#C1643B]">H-#{selectedTableId}</p>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    onClick={() => setShowSuccess(true)}
                                    disabled={!selectedTableId}
                                    className={`w-full py-6 rounded-4xl font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-500 ${
                                        selectedTableId 
                                        ? 'bg-slate-900 text-white shadow-2xl hover:bg-[#C1643B] hover:scale-[1.02]' 
                                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                    }`}
                                >
                                    Confirm Placement
                                </button>
                            </div>
                        </motion.div>
                    </aside>
                </div>
            </div>

            {/* MODALS RENDER HERE (KEEPING YOUR EXISTING LOGIC) */}
            <AnimatePresence>
                {showSuccess && selectedTable && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 30 }} 
                            animate={{ scale: 1, y: 0 }} 
                            exit={{ scale: 0.9, y: 30 }} 
                            className="bg-white rounded-[3rem] p-12 max-w-md w-full relative shadow-2xl text-center"
                        >
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 text-3xl">✓</div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Confirmed</h2>
                            <p className="text-slate-500 text-sm mb-10 leading-relaxed uppercase tracking-widest">
                                Table secured for <span className="text-slate-900 font-bold">{selectedTable.size} guests</span>.
                            </p>
                            
                            <div className="bg-slate-50 rounded-3xl p-8 mb-10 text-left space-y-4 border border-slate-100">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">Date</span>
                                    <span>{bookingDate}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">Time Block</span>
                                    <span>{formatHour(arrivalHour)} - {formatHour(exitHour)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest border-t border-slate-200 pt-4">
                                    <span className="text-slate-400">Table Position</span>
                                    <span className="text-[#C1643B]">HAVEN #{selectedTableId}</span>
                                </div>
                            </div>

                            <button onClick={() => setShowSuccess(false)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#C1643B] transition-colors">Return</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </section>
    );
}