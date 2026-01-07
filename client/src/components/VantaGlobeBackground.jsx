import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

export default function VantaGlobeBackground() {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                GLOBE({
                    el: vantaRef.current,
                    THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,

                    // 🎨 Visual tuning
                    color: 0x39ff14,          // neon green
                    color2: 0x7c3aed,         // purple accent
                    backgroundColor: 0x000000, // Black background

                    size: 1.1,
                    spacing: 18,
                    scale: 1.0,
                    scaleMobile: 0.8,
                })
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div
            ref={vantaRef}
            className="fixed inset-0 -z-10 hidden md:block"
            style={{ pointerEvents: 'none', zIndex: -10 }} // Ensure clicks create interaction but don't block content
        />
    );
};
