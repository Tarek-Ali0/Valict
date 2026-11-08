"use client";

import { useEffect, useRef } from "react";

export default function ExperimentPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, isOnV: false };

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
        if (!mouse.isOnV) {
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
          return;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        let maxDistance = 60;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density * -1;
        let directionY = forceDirectionY * force * this.density * -1;

        if (distance < maxDistance) {
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

    const init = () => {
      particles.length = 0;
      ctx.clearRect(0, 0, width, height);

      const img = new Image();
      img.src = "/JustV.png"; 

      img.onload = () => {
        const imgWidth = width * 0.3; 
        const imgHeight = (img.height / img.width) * imgWidth;
        const xOffset = (width - imgWidth) / 2;
        const yOffset = (height - imgHeight) / 2;

        ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);

        const imgCoordinates = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        const gap = 3; 
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
      
      const nearbyParticles = [];

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();

        if (mouse.isOnV) {
          let dx = mouse.x - particles[i].x;
          let dy = mouse.y - particles[i].y;
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
      mouse.x = e.x;
      mouse.y = e.y;

      let minDistance = Infinity;
      for (let i = 0; i < particles.length; i++) {
        let dx = mouse.x - particles[i].baseX;
        let dy = mouse.y - particles[i].baseY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
          minDistance = distance;
        }
      }

      mouse.isOnV = minDistance < 20; 
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isOnV = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
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
    <div className="relative w-full min-h-screen bg-white dark:bg-[#0B1120] transition-colors duration-300 overflow-hidden">
      
      {/* --- Premium Background Elements (Fixed عشان تغطي كل الصفحة) --- */}
      <div 
        className="fixed top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"
        style={{ backgroundColor: "rgba(0, 163, 224, 0.1)" }}
      ></div>
      <div 
        className="fixed bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"
        style={{ backgroundColor: "rgba(30, 58, 138, 0.07)" }}
      ></div>
      {/* ----------------------------------- */}

      {/* الكانفس فوق الخلفية */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}
