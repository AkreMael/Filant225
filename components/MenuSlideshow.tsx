import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

    // Preload all slide images into browser cache for instant lag-free transitions
    useEffect(() => {
        SLIDES.forEach((slide) => {
            const img1 = new Image();
            img1.src = slide.src;
            const img2 = new Image();
            img2.src = slide.fallback;
        });
    }, []);

    // Automatic smooth slideshow without user interaction (every 5 seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const currentSlide = SLIDES[currentIndex];

    return (
        <div className="mt-3 w-full relative overflow-hidden select-none pointer-events-none">
            {/* Aspect ratio container locks height to exact image proportions (1250x450), avoiding any height shift or layout jitter */}
            <div className="w-full relative aspect-[1250/450] max-h-[380px] overflow-hidden">
                <AnimatePresence initial={false} mode="sync">
                    <motion.div
                        key={currentSlide.id}
                        initial={{ x: '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '-100%' }}
                        transition={{
                            duration: 0.85,
                            ease: [0.25, 0.1, 0.25, 1.0]
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={currentSlide.src}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== currentSlide.fallback) {
                                    target.src = currentSlide.fallback;
                                }
                            }}
                            alt={currentSlide.alt}
                            className="w-full h-full object-contain pointer-events-none block"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MenuSlideshow;
