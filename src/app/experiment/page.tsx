"use client";

import { useState, useEffect, useRef } from "react";

export default function ExperimentPage() {
  const [isIntro, setIsIntro] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introCanvasRef = useRef<HTMLCanvasElement>(null);

  // تأثير تحميل الإنترو
  useEffect(() => {
    if (!isIntro) return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; 
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isIntro]);

  // حركة النقط
  const initParticles = (canvas: HTMLCanvasElement, isIntroCanvas: boolean) => {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 60 };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      color: string;
      vx: number;
      vy: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.density = Math.random() * 30 + 1;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density * -1;
        let directionY = forceDirectionY * force * this.density * -1;

        if (distance < mouse.radius) {
          this.x += directionX;
          this.y += directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.vx = dx * -0.05;
            this.x += this.vx;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.vy = dy * -0.05;
            this.y += this.vy;
          }
        }
      }
    }

    const img = new Image();
    img.src = "/JustV.png";
    img.onload = () => {
      // حجم اللوجو (أصغر في الإنترو)
      const imgWidth = width * (isIntroCanvas ? 0.2 : 0.3);
      const imgHeight = (img.height / img.width) * imgWidth;
      
      // مكان اللوجو (في الإنترو نرفعه لفوق شوية عشان شريط التحميل)
      const xOffset = (width - imgWidth) / 2;
      const yOffset = (height - imgHeight) / (isIntroCanvas ? 3 : 2); // 1/3 من فوق للإنترو

      ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);
      const imgCoordinates = ctx.getImageData(0, 0, width, height);
      ctx.clearRect(0, 0, width, height);

      const gap = 3;
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = imgCoordinates.data[index + 3];
          if (alpha > 128) {
            const random = Math.random();
            let color;
            if (random < 0.6) color = "#00A3E0";
            else if (random < 0.85) color = "#FFFFFF";
            else color = "#1E3A8A";
            particles.push(new Particle(x, y, color));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const nearbyParticles: { x: number; y: number; distance: number }[] = [];
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
        let dx = mouse.x - particles[i].x;
        let dy = mouse.y - particles[i].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          nearbyParticles.push({ x: particles[i].x, y: particles[i].y, distance });
        }
      }
      nearbyParticles.sort((a, b) => a.distance - b.distance);
      const closest = nearbyParticles.slice(0, 10);
      closest.forEach((p) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 163, 224, 0.15)`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.x; mouse.y = e.y; };
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  // تشغيل الحركة للإنترو (لما الصفحة تحمل)
  useEffect(() => {
    if (introCanvasRef.current && isIntro) {
      const cleanup = initParticles(introCanvasRef.current, true);
      return () => {
        if (typeof cleanup === 'function') cleanup();
      };
    }
  }, [isIntro]);

  // تشغيل الحركة للصفحة العادية (لما ندخل)
  useEffect(() => {
    if (canvasRef.current && !isIntro) {
      const cleanup = initParticles(canvasRef.current, false);
      return () => {
        if (typeof cleanup === 'function') cleanup();
      };
    }
  }, [isIntro]);

  const handleEnterSite = (lang: string) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsIntro(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-[#0B1120] overflow-hidden">
      
      {/* صفحة الإنترو */}
      {isIntro && (
        <div
          className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
            isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <canvas ref={introCanvasRef} className="absolute inset-0 z-0" />
          
          {/* محتوى الإنترو (شريط التحميل والأزرار) */}
          <div className="relative z-10 flex flex-col items-center mt-[40vh]">
            {/* شريط التحميل */}
            <div className="w-64 h-1 bg-slate-700 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-[#00A3E0] transition-all duration-100 ease-linear"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {/* زرار اللغة (بتظهر بعد اكتمال التحميل) */}
            {loadingProgress >= 100 && (
              <div className="flex gap-4 animate-fade-in">
                <button
                  onClick={() => handleEnterSite("ar")}
                  className="px-6 py-2 bg-[#00A3E0] text-white rounded-lg font-bold hover:bg-[#1E3A8A] transition-colors"
                >
                  عربي
                </button>
                <button
                  onClick={() => handleEnterSite("en")}
                  className="px-6 py-2 bg-[#1E3A8A] text-white rounded-lg font-bold hover:bg-[#00A3E0] transition-colors"
                >
                  English
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* صفحة الـ Experiment العادية */}
      {!isIntro && (
        <div className="relative w-full h-screen">
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        </div>
      )}
    </div>
  );
}
