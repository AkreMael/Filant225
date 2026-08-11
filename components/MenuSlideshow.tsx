import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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

    // Preload all slide images into browser cache for instant lag-free crossfades
    useEffect(() => {
        SLIDES.forEach((slide) => {
            const img1 = new Image();
            img1.src = slide.src;
            const img2 = new Image();
            img2.src = slide.fallback;
        });
    }, []);

    // Automatic slideshow changing every 10 seconds (10000ms) without user interaction
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="mt-3 w-full relative overflow-hidden select-none pointer-events-none">
            {/* Aspect ratio container locks height to exact image proportions (1250x450), avoiding any height shift or layout jitter */}
            <div className="w-full relative aspect-[1250/450] max-h-[380px] overflow-hidden">
                {SLIDES.map((slide, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                        <motion.img
                            key={slide.id}
                            src={slide.src}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== slide.fallback) {
                                    target.src = slide.fallback;
                                }
                            }}
                            alt={slide.alt}
                            initial={false}
                            animate={{
                                opacity: isActive ? 1 : 0,
                                zIndex: isActive ? 10 : 1
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none block"
                            referrerPolicy="no-referrer"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MenuSlideshow;
