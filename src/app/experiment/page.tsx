"use client";

import "@/app/globals.css";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";

// ==================== الـ dict ====================
const dict = {
  nav: {
    changeLanguage: "Change Language",
    toggleTheme: "Toggle Theme",
    getStarted: "Get Started",
    services: "Services",
    whyValict: "Why Valict",
    aboutUs: "About Us",
    faq: "FAQ",
  },
  hero: {
    badge: "Where ICT Meets Value",
    title1: "Powering your business with",
    title2: "Reliable Solutions",
    cta: "Get Started",
  },
  about: {
    text: "At Valict, we specialize in delivering integrated ICT infrastructure solutions. Our focus is reducing downtime, improving performance, and ensuring continuity. Technology is a tool to create real value.",
  },
  footer: {
    contactUs: "Contact Us",
  },
};

// ==================== مكون الكانفس ====================
function LetterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, isOnV: false };

    class Particle {
      x: number; y: number; baseX: number; baseY: number;
      size: number; density: number; color: string; vx: number; vy: number;

      constructor(x: number, y: number, color: string) {
        this.x = x; this.y = y; this.baseX = x; this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.density = Math.random() * 30 + 1;
        this.color = color; this.vx = 0; this.vy = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath(); ctx.fill();
      }

      update() {
        if (!mouse.isOnV) {
           if (this.x !== this.baseX) { let dx = this.x - this.baseX; this.vx = dx * -0.05; this.x += this.vx; }
           if (this.y !== this.baseY) { let dy = this.y - this.baseY; this.vy = dy * -0.05; this.y += this.vy; }
           return;
        }
        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance; let forceDirectionY = dy / distance;
        let maxDistance = 60;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density * -1;
        let directionY = forceDirectionY * force * this.density * -1;

        if (distance < maxDistance) { this.x += directionX; this.y += directionY; } 
        else {
          if (this.x !== this.baseX) { let dx = this.x - this.baseX; this.vx = dx * -0.05; this.x += this.vx; }
          if (this.y !== this.baseY) { let dy = this.y - this.baseY; this.vy = dy * -0.05; this.y += this.vy; }
        }
      }
    }

    const init = () => {
      particles.length = 0;
      ctx.clearRect(0, 0, width, height);
      const img = new Image();
      img.src = "/JustV.png"; 

      img.onload = () => {
        const logoScale = 0.8; // كبرنا الحرف شوية عشان يبان
        const imgWidth = width * logoScale;
        const imgHeight = (img.height / img.width) * imgWidth;
        
        const xOffset = (width - imgWidth) / 2;
        const yOffset = (height - imgHeight) / 2;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);

        const imgCoordinates = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        const gap = width < 768 ? 4 : 3; 
        const colors = ["#00A3E0", "#1E3A8A"]; 

        for (let y = 0; y < height; y += gap) {
          for (let x = 0; x < width; x += gap) {
            const index = (y * width + x) * 4;
            const alpha = imgCoordinates.data[index + 3];
            if (alpha > 128) {
              const random = Math.random();
              let color;
              if (random < 0.7) color = "#00A3E0";
              else color = "#1E3A8A";
              particles.push(new Particle(x, y, color));
            }
          }
        }
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const nearbyParticles = [];
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
        if (mouse.isOnV) {
          let dx = mouse.x - particles[i].x; let dy = mouse.y - particles[i].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 60) {
            nearbyParticles.push({ x: particles[i].x, y: particles[i].y, distance });
          }
        }
      }

      if (mouse.isOnV) {
        nearbyParticles.sort((a, b) => a.distance - b.distance);
        const closest = nearbyParticles.slice(0, 10);
        closest.forEach((p) => {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(0, 163, 224, 0.15)"; 
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        });
      }
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; 
      mouse.y = e.clientY - rect.top;
      
      let minDistance = Infinity;
      for (let i = 0; i < particles.length; i++) {
        let dx = mouse.x - particles[i].baseX; let dy = mouse.y - particles[i].baseY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) minDistance = distance;
      }
      mouse.isOnV = minDistance < 20; 
    };

    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; mouse.isOnV = false; };
    
    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
        init();
      }
    };

    init();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

// ==================== الصفحة ====================
export default function ExperimentPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-[#0B1120]">
      <Navbar lang="en" dict={dict} />

      {/* الحاوية الرئيسية للهيرو */}
      <section
        ref={containerRef}
        className="relative w-full h-auto transition-colors duration-300 overflow-hidden"
      >
        {/* --- Premium Background Elements (زي الهيرو الأصلي) --- */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-cyan/[0.10] dark:bg-valict-cyan/[0.07] rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-navy/[0.07] dark:bg-valict-cyan/[0.05] rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="circuit-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.05] -z-20 pointer-events-none"></div>
        {/* ----------------------------------- */}

        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-24 lg:pb-32">
          
          {/* حاوية الديسكتوب — Split Layout */}
          <div className="hidden lg:block relative z-20 w-full">
            <div className="flex justify-center mb-8 -mt-4">
              <div className="inline-flex items-center gap-2 px-5 py-2 text-sm rounded-full bg-white dark:bg-slate-900 border border-valict-cyan/30 dark:border-valict-cyan/20 shadow-md shadow-valict-cyan/10">
                <span className="flex h-2.5 w-2.5 rounded-full bg-valict-cyan animate-pulse"></span>
                <span className="text-sm font-bold text-slate-900 dark:text-valict-cyan tracking-widest uppercase">
                  {dict.hero.badge}
                </span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-valict-cyan animate-pulse"></span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 xl:gap-12 items-center w-full">
              <div className="flex flex-col text-start space-y-3 min-w-0">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black leading-[1.15] text-valict-dark dark:text-white tracking-tight">
                  <span className="lg:whitespace-nowrap">{dict.hero.title1}</span>
                  <br />
                  <span className="logo-gradient-text leading-relaxed lg:whitespace-nowrap">
                    {dict.hero.title2}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
                  {dict.about.text}
                </p>

                <div className="pt-2">
                  <Link
                    href="#contact"
                    className="inline-flex font-sans btn-gradient text-white px-7 py-3 rounded-xl font-bold text-sm items-center gap-2 shadow-lg shadow-valict-cyan/25 hover:shadow-valict-cyan/40 transition-all duration-300"
                  >
                    {dict.hero.cta}
                    <FaArrowRightLong className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>

              {/* الكانفس جوه مساحة ثابتة، وشيلنا الـ motion.div اللي كان بيعمل scale */}
              <div className="w-full h-[400px] flex items-center justify-center">
                <LetterCanvas />
              </div>
            </div>
          </div>

          {/* حاوية الموبايل والتابلت */}
          <div className="lg:hidden relative z-20 flex flex-col items-center text-start w-full">
            <div className="w-full flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-full bg-white dark:bg-slate-900 border border-valict-cyan/30 dark:border-valict-cyan/20 shadow-md shadow-valict-cyan/10">
                <span className="flex h-2.5 w-2.5 rounded-full bg-valict-cyan animate-pulse"></span>
                <span className="text-sm font-bold text-slate-900 dark:text-valict-cyan tracking-widest uppercase">
                  {dict.hero.badge}
                </span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-valict-cyan animate-pulse"></span>
              </div>
            </div>

            <div className="w-full h-[300px] mb-6 flex items-center justify-center">
              <LetterCanvas />
            </div>

            <h2 className="w-full text-2xl xs:text-3xl sm:text-4xl font-black leading-[1.2] mb-4 text-valict-dark dark:text-white tracking-tight text-start">
              {dict.hero.title1} <br />
              <span className="logo-gradient-text leading-relaxed">
                {dict.hero.title2}
              </span>
            </h2>

            <p className="w-full text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mb-6 leading-relaxed font-medium text-start">
              {dict.about.text}
            </p>

            <div className="w-full">
              <Link
                href="#contact"
                className="inline-flex font-sans btn-gradient text-white px-6 py-2.5 rounded-xl font-bold text-xs items-center gap-2 shadow-lg shadow-valict-cyan/25"
              >
                {dict.hero.cta}
                <FaArrowRightLong className="h-3 w-3 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* Line Separator — تحت     */}
        {/* ========================= */}
        <div className="w-full">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-gradient-to-r rtl:bg-gradient-to-l from-slate-400 to-transparent dark:from-slate-600"></div>
            <div className="w-40 md:w-52"></div>
            <div className="flex-1 h-[1px] bg-gradient-to-l rtl:bg-gradient-to-r from-slate-400 to-transparent dark:from-slate-600"></div>
          </div>
        </div>
        {/* ========================= */}

      </section>
    </div>
  );
}
