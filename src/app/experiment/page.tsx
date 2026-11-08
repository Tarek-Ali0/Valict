"use client";

import { useState, useEffect, useRef } from "react";

export default function ExperimentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

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

    const drawBackground = () => {
      if (!ctx) return;
      const grad1 = ctx.createRadialGradient(width, 0, 0, width, 0, Math.max(width, height));
      grad1.addColorStop(0, "rgba(0, 163, 224, 0.35)");
      grad1.addColorStop(1, "rgba(0, 163, 224, 0)");
      ctx.fillStyle = grad1; ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(0, height, 0, 0, height, Math.max(width, height));
      grad2.addColorStop(0, "rgba(30, 58, 138, 0.30)");
      grad2.addColorStop(1, "rgba(30, 58, 138, 0)");
      ctx.fillStyle = grad2; ctx.fillRect(0, 0, width, height);
    };

    const init = () => {
      particles.length = 0;
      ctx.clearRect(0, 0, width, height);
      const img = new Image();
      img.src = "/JustV.png"; 

      img.onload = () => {
        drawBackground();
        const logoScale = width < 768 ? 0.5 : 0.35;
        const imgWidth = width * logoScale;
        const imgHeight = (img.height / img.width) * imgWidth;
        
        const xOffset = (width - imgWidth) / 2;
        const yOffset = (height - imgHeight) / 2; 

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);

        const imgCoordinates = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        const gap = width < 768 ? 4 : 3; 
        const colors = ["#00A3E0", "#1E3A8A", "#FFFFFF"]; 

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
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawBackground(); 
      
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
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      init();
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

  return (
    // الحاوية الرئيسية flex-col عشان نرتب العناصر عمودياً
    <div className="w-full h-[100dvh] overflow-hidden bg-white dark:bg-[#0B1120] transition-colors duration-300 flex flex-col">
      
      {/* حاوية الكانفس - بتاخد المساحة المتبقية (flex-1) */}
      <div ref={canvasContainerRef} className="relative w-full flex-1">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 w-full h-full"
        />
      </div>

      {/* شريط التحميل والزرارين - تحت الكانفس مباشرة (في مساحة ثابتة) */}
      <div className="relative z-10 flex flex-col items-center justify-center pb-8 pt-4 bg-transparent">
        
        {/* شريط التحميل */}
        <div className="w-64 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mb-6 overflow-hidden shadow-sm">
          <div
            className="h-full bg-[#00A3E0] transition-all duration-100 ease-linear"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        {/* الزرارين */}
        <div
          className={`flex gap-4 transition-all duration-500 ${
            isLoading ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"
          }`}
        >
          <button
            onClick={() => window.location.href = "/ar"}
            className="px-8 py-2 bg-[#00A3E0] text-white rounded-lg font-bold hover:bg-[#1E3A8A] transition-colors shadow-lg"
          >
            عربي
          </button>
          <button
            onClick={() => window.location.href = "/en"}
            className="px-8 py-2 bg-[#1E3A8A] text-white rounded-lg font-bold hover:bg-[#00A3E0] transition-colors shadow-lg"
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}
