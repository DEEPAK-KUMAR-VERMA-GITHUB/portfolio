"use client"

import { useEffect, useState } from "react";
import { Particles } from "@/types/Hero/types";
import { motion } from "framer-motion";

const FloatingParticles = () => {

    const [particles, setParticles] = useState<Particles[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 50 }, (_, index) => ({
            id: index,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }))

        setParticles(newParticles)

    }, [])


    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {
                particles?.map((particle) => (
                    <motion.div key={particle.id}
                        className="absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 blur-sm "
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 100 - 50, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))
            }
        </div>
    );
};

export default FloatingParticles;