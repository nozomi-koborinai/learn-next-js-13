'use client'
import { useEffect, useRef } from 'react';

const LINE_COUNT = 150;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    const lines: Line[] = Array.from({ length: LINE_COUNT }, () => createLine(ctx, canvas.width, canvas.height));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setGradient(ctx, canvas.width, canvas.height);
      lines.forEach(line => {
        line.draw();
        line.update();
      });
      requestAnimationFrame(animate);
    };

    animate();

  }, []);

  return (
    <div className="relative w-full h-screen">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>

      <div className="absolute top-0 left-0 w-2/5 h-screen flex items-start justify-center p-10">
        <img src="/path_to_logo.png" alt="Your Logo" className="w-32 h-32" />
      </div>

      <div className="absolute top-0 right-0 w-3/5 h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold text-white">App Title</h1>
        <button className="bg-blue-600 text-white py-2 px-6 rounded">Google Sign-In</button>
      </div>
    </div>
  );
}


class Line {
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;

  constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, x: number, y: number, length: number, angle: number, speed: number) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.speed = speed;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.length * Math.cos(this.angle), this.y + this.length * Math.sin(this.angle));
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.075)';
    this.ctx.stroke();
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (this.x > this.canvasWidth || this.x < 0 || this.y > this.canvasHeight || this.y < 0) {
      this.x = Math.random() * this.canvasWidth;
      this.y = Math.random() * this.canvasHeight;
    }
  }
}

function createLine (ctx: CanvasRenderingContext2D, width: number, height: number): Line {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const length = Math.random() * 40 + 10;
  const angle = Math.random() * (2 * Math.PI);
  const speed = Math.random() * 1.5 + 0.5;
  return new Line(ctx, width, height, x, y, length, angle, speed);
}

function setGradient(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
  gradient.addColorStop(0, '#322d63');
  gradient.addColorStop(1, '#635d8e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}
