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
        return prev + 2; // سرعة التحميل
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isIntro]);

  // حركة النقط (هنستخدمها في الإنترو وفي الصفحة العادية)
  const initParticles = (canvas: HTMLCanvasElement, opacity: number = 1) => {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: any[] = [];
    const mouse = { x: -1000, y: -1000, radius: 60 };

    class Particle {
      x, y, baseX, baseY, size, density, color, vx, vy;
      constructor(x, y, color) {
        this.x = x; this.y = y; this.baseX = x; this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.density = Math.random() * 30 + 1;
        this.color = color; this.vx = 0; this.vy = 0;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance; let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density * -1;
        let directionY = forceDirectionY * force * this.density * -1;

        if (distance < mouse.radius) {
          this.x += directionX; this.y += directionY;
        } else {
          if (this.x !== this.baseX) { let dx = this.x - this.baseX; this.vx = dx * -0.05; this.x += this.vx; }
          if (this.y !== this.baseY) { let dy = this.y - this.baseY; this.vy = dy * -0.05; this.y += this.vy; }
        }
      }
    }

    const img = new Image();
    img.src = "/JustV.png";
    img.onload = () => {
      const imgWidth = width * (isIntro ? 0.25 : 0.3); // حجم أصغر للإنترو
      const imgHeight = (img.height / img.width) * imgWidth;
      const xOffset = (width - imgWidth) / 2;
      const yOffset = (height - imgHeight) / 2;

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
      const nearbyParticles: any[] = [];
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
        ctx.strokeStyle = `rgba(0, 163, 224, ${0.15 * opacity})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.x; mouse.y = e.y; };
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // إعادة التهيئة عند تغيير الحجم (مبسطة)
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  };

  // تشغيل حركة النقط للإنترو
  useEffect(() => {
    if (introCanvasRef.current) {
      initParticles(introCanvasRef.current, 1);
    }
  }, [isIntro]);

  // تشغيل حركة النقط للصفحة العادية
  useEffect(() => {
    if (!isIntro && canvasRef.current) {
      initParticles(canvasRef.current, 1);
    }
  }, [isIntro]);

  const handleEnterSite = (lang: string) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsIntro(false);
      // ممكن هنا نضيف تحويل لمسار اللغة
      // window.location.href = `/${lang}/`;
    }, 800); // وقت الـ fade out
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
          
          {/* محتوى الإنترو */}
          <div className="relative z-10 flex flex-col items-center mt-64">
            {/* شريط التحميل */}
            <div className="w-64 h-1 bg-slate-700 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-valict-cyan transition-all duration-100 ease-linear"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {/* زرار اللغة (تظهر بعد اكتمال التحميل) */}
            {loadingProgress >= 100 && (
              <div className="flex gap-4 animate-fade-in">
                <button
                  onClick={() => handleEnterSite("ar")}
                  className="px-6 py-2 bg-valict-cyan text-white rounded-lg font-bold hover:bg-valict-navy transition-colors"
                >
                  عربي
                </button>
                <button
                  onClick={() => handleEnterSite("en")}
                  className="px-6 py-2 bg-valict-navy text-white rounded-lg font-bold hover:bg-valict-cyan transition-colors"
                >
                  English
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* صفحة الـ Experiment العادية (تظهر بعد الإنترو) */}
      {!isIntro && (
        <div className="relative w-full h-screen">
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        </div>
      )}
    </div>
  );
}
