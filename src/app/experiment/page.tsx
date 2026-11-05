"use client";

import { useEffect, useRef } from "react";

export default function ExperimentPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // إعدادات الكانفس
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // إعدادات النقط
    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 100 };

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

    const init = () => {
      particles.length = 0;
      ctx.clearRect(0, 0, width, height);

      const img = new Image();
      // رجعنا للحرف فقط عشان الوضوح
      img.src = "/JustV.png"; 

      img.onload = () => {
        // حجم مناسب للحرف
        const imgWidth = width * 0.3; 
        const imgHeight = (img.height / img.width) * imgWidth;
        const xOffset = (width - imgWidth) / 2;
        const yOffset = (height - imgHeight) / 2;

        ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);

        const imgCoordinates = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        // ظبطنا المسافة بين النقط
        const gap = 3; 
        // رجعنا اللونين بتوع فالكت (كحلي غامق وسماوي)
        const colors = ["#1E3A8A", "#00A3E0"]; 

        for (let y = 0; y < height; y += gap) {
          for (let x = 0; x < width; x += gap) {
            const index = (y * width + x) * 4;
            const alpha = imgCoordinates.data[index + 3];
            
            if (alpha > 128) {
              const color = colors[Math.floor(Math.random() * colors.length)];
              particles.push(new Particle(x, y, color));
            }
          }
        }
      };

      img.onerror = () => {
        // Fallback
        const text = "V";
        const fontSize = 300;
        ctx.fillStyle = "white";
        ctx.font = `900 ${fontSize}px Arial Black, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, width / 2, height / 2);

        const textCoordinates = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        const gap = 4;
        const colors = ["#00A3E0", "#1E3A8A", "#FFFFFF"];

        for (let y = 0; y < height; y += gap) {
          for (let x = 0; x < width; x += gap) {
            const index = (y * width + x) * 4;
            const alpha = textCoordinates.data[index + 3];
            
            if (alpha > 128) {
              const color = colors[Math.floor(Math.random() * colors.length)];
              particles.push(new Particle(x, y, color));
            }
          }
        }
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
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
    <div className="min-h-screen bg-[#0B1120] relative overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}
