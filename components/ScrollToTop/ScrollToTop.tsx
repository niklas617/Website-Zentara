"use client"; // Ganz wichtig in Next.js für Client-Interaktionen

import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.css'; // Wir nutzen CSS Modules

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    // Prüfen, ob weit genug gescrollt wurde
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Scrollfortschritt berechnen
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const scrollPercentage = (currentScroll / totalHeight) * 100;
            setProgress(scrollPercentage);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className={`${styles.container} ${isVisible ? styles.show : ""}`}>
            <button
                className={styles.scrollTopBtn}
                onClick={scrollToTop}
                aria-label="Nach oben scrollen"
            >
                {/* Der Fortschrittsring */}
                <svg className={styles.progressRing} width="64" height="64">
                    <circle
                        className={styles.progressRingCircle}
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        r={radius}
                        cx="32"
                        cy="32"
                        style={{
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: offset,
                        }}
                    />
                </svg>

                {/* Der Pfeil */}
                <svg
                    className={styles.arrowIcon}
                    width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>
        </div>
    );
};

export default ScrollToTop;