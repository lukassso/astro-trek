import { useEffect, useCallback } from 'react';

class Star {
  x: number;
  y: number;
  z: number;
  xPrev: number;
  yPrev: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.xPrev = x;
    this.yPrev = y;
  }

  update(width: number, height: number, speed: number) {
    this.xPrev = this.x;
    this.yPrev = this.y;
    this.z += speed * 0.0275;
    this.x += this.x * (speed * 0.0225) * this.z;
    this.y += this.y * (speed * 0.0225) * this.z;
    
    if (this.isOutOfBounds(width, height)) {
      this.reset(width, height);
    }
  }

  private isOutOfBounds(width: number, height: number): boolean {
    return (
      this.x > width / 2 ||
      this.x < -width / 2 ||
      this.y > height / 2 ||
      this.y < -height / 2
    );
  }

  private reset(width: number, height: number): void {
    this.x = Math.random() * width - width / 2;
    this.y = Math.random() * height - height / 2;
    this.xPrev = this.x;
    this.yPrev = this.y;
    this.z = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = this.z;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.xPrev, this.yPrev);
    ctx.stroke();
  }
}

interface StarfieldConfig {
  containerId: string;
  canvasId: string;
  count?: number;
  speed?: number;
}

export function useStarfield({ containerId, canvasId, count = 300, speed = Math.random() * 0.1 + 0.05 }: StarfieldConfig) {
  const setupCanvas = useCallback((container: HTMLElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, stars: Star[]) => {
    const { clientWidth: width, clientHeight: height } = container;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);
    ctx.translate(width / 2, height / 2);

    stars.forEach(star => {
      star.x = Math.random() * width - width / 2;
      star.y = Math.random() * height - height / 2;
      star.z = 0;
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const isDarkMode = root.getAttribute("data-theme") === "dark";
    const stars = Array.from({ length: count }, () => new Star(0, 0, 0));
    let rafId = 0;

    const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
    const container = document.querySelector(`#${containerId}`) as HTMLElement;
    
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fillStyleColor = isDarkMode ? "rgba(17, 24, 39, 0.6)" : "rgba(249, 250, 251, 0.6)";
    const strokeStyleColor = isDarkMode ? "rgba(249, 250, 251, 1)" : "rgba(17,24,39, 1)";
    
    ctx.fillStyle = fillStyleColor;
    ctx.strokeStyle = strokeStyleColor;

    const resizeObserver = new ResizeObserver(() => {
      rafId > 0 && cancelAnimationFrame(rafId);
      setupCanvas(container, canvas, ctx, stars);
      rafId = requestAnimationFrame(animate);
    });

    const animate = () => {
      const { clientWidth: width, clientHeight: height } = container;
      
      // Najpierw czyścimy canvas rysując tło
      ctx.fillStyle = fillStyleColor;
      ctx.fillRect(-width / 2, -height / 2, width, height);
      
      // Następnie rysujemy gwiazdy
      ctx.strokeStyle = strokeStyleColor;
      stars.forEach(star => {
        star.update(width, height, speed);
        star.draw(ctx);
      });

      rafId = requestAnimationFrame(animate);
    };

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [canvasId, containerId, count, speed, setupCanvas]);
}
