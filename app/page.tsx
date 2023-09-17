'use client'
import { useEffect, useRef } from 'react';

const DatadogCanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Line {
      constructor(x, y, length, angle, speed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.angle = angle;
        this.speed = speed;
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length * Math.cos(this.angle), this.y + this.length * Math.sin(this.angle));
        ctx.strokeStyle = `rgba(173, 216, 230, ${Math.random() * 0.5 + 0.05})`; 
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }
    }

    const lines = [];
    for (let i = 0; i < 300; i++) { 
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const length = Math.random() * 80 + 10;
      const angle = Math.random() * (2 * Math.PI);
      const speed = Math.random() * 1.5 + 0.5;
      lines.push(new Line(x, y, length, angle, speed));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width);
      gradient.addColorStop(0, '#322d63');
      gradient.addColorStop(1, '#635d8e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach(line => {
        line.draw();
        line.update();
      });

      requestAnimationFrame(animate);
    };

    animate();

  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute top-0 left-0"></canvas>
    </div>
  );
};

export default DatadogCanvasBackground;
