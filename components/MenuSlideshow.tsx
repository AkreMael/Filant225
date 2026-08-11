import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        src: '/images/menu_slide1.png',
        fallback: 'https://i.supaimg.com/0543a7e5-673b-44b9-9668-8152c5aea01b/7572be40-e352-4291-9a7c-0a7de30e8bd5.png',
        alt: 'Filant 225 - Slide 1'
    },
    {
        id: 2,
        src: '/images/menu_slide2.png',
        fallback: 'https://i.supaimg.com/0543a7e5-673b-44b9-9668-8152c5aea01b/ed2aef9a-e495-4f20-a504-2bc6050cb75f.png',
        alt: 'Filant 225 - Slide 2'
    },
    {
        id: 3,
        src: '/images/menu_slide3.jpg',
        fallback: 'https://i.supaimg.com/0543a7e5-673b-44b9-9668-8152c5aea01b/19fb74ac-cdbb-4620-bce5-0d5e870a3154.jpg',
        alt: 'Filant 225 - Slide 3'
    },
    {
        id: 4,
        src: '/images/menu_slide4.jpg',
        fallback: 'https://i.supaimg.com/0543a7e5-673b-44b9-9668-8152c5aea01b/3bc844b9-ce8a-415d-b2d4-e80362851207.jpg',
        alt: 'Filant 225 - Slide 4'
    }
];

export const MenuSlideshow: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const touchStartX = useRef<number | null>(null);

    // Auto slideshow timer: 10 seconds (10000 ms)
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
        }, 10000);

        return () => clearInterval(timer);
    }, [isHovered]);

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX.current - touchEndX;

        if (Math.abs(diffX) > 40) {
            if (diffX > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        touchStartX.current = null;
    };

    return (
        <div 
            className="mt-4 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900 relative group select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Image Slide Container */}
            <div className="w-full relative overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={SLIDES[currentIndex].src}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== SLIDES[currentIndex].fallback) {
                                target.src = SLIDES[currentIndex].fallback;
                            }
                        }}
                        alt={SLIDES[currentIndex].alt}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-auto block object-contain"
                        referrerPolicy="no-referrer"
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrev}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 opacity-80 group-hover:opacity-100 z-10"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
                onClick={handleNext}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 opacity-80 group-hover:opacity-100 z-10"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Pagination Indicators / Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
                {SLIDES.map((slide, idx) => (
                    <button
                        key={slide.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(idx);
                        }}
                        aria-label={`Aller à la diapositive ${idx + 1}`}
                        className={`transition-all duration-300 rounded-full ${
                            idx === currentIndex 
                                ? 'w-6 h-2 bg-orange-500 shadow-md' 
                                : 'w-2 h-2 bg-white/70 hover:bg-white shadow-sm'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MenuSlideshow;
