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
        this.size = Math.random() * 2 + 1; // حجم النقطة
        this.density = Math.random() * 30 + 1; // كثافة النقطة (بتأثر على سرعة الرجوع)
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
        // حساب المسافة بين الماوس والنقطة
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        // أقصى مسافة تأثير الماوس
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density * -1; // -1 عشان يبعد
        let directionY = forceDirectionY * force * this.density * -1;

        if (distance < mouse.radius) {
          // لو الماوس قريب، النقطة تبعد
          this.x += directionX;
          this.y += directionY;
        } else {
          // لو الماوس بعيد، النقطة ترجع لمكانها الأساسي
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

    // دالة رسم النص وتحويله لنقط
    const init = () => {
      particles.length = 0;
      
      // إعدادات النص
      const text = "V";
      const fontSize = 400; // حجم الحرف
      const fontFamily = "Arial Black, sans-serif";
      
      // رسم النص مؤقتاً في الكانفس عشان نقرأ البكسلات
      ctx.fillStyle = "white";
      ctx.font = `900 ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // مسح الكانفس
      ctx.clearRect(0, 0, width, height);
      
      // رسم النص في النص
      ctx.fillText(text, width / 2, height / 2);

      // قراءة بيانات الصورة
      const textCoordinates = ctx.getImageData(0, 0, width, height);
      
      // مسح الكانفس تاني عشان نرسم النقط
      ctx.clearRect(0, 0, width, height);

      // تحليل البكسلات
      const gap = 4; // المسافة بين النقط (كل ما تقل، النقط تزيد)
      const colors = ["#00A3E0", "#1E3A8A", "#FFFFFF", "#0284c7"]; // ألوان فالكت

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = textCoordinates.data[index + 3];
          
          // لو البكسل ده فيه جزء من النص (مش شفاف)
          if (alpha > 128) {
            // اختيار لون عشوائي
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
          }
        }
      }
    };

    // دالة التحريك
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      
      requestAnimationFrame(animate);
    };

    // التعامل مع حركة الماوس
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

    // تشغيل كل حاجة
    init();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // تنظيف
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
