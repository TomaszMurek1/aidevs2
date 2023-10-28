import React, { useRef, useEffect } from "react";

class Wave {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    const canvasElement = document.getElementById(canvasId);
    if (!canvasElement || !(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error("Element not found or not a canvas element.");
    }
    this.canvas = canvasElement;

    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to get 2d context from canvas.");
    }
    this.ctx = context;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  drawWave(): void {
    let waveLength = 0.01;
    let amplitude = 100;
    let frequency = 0.01;
    this.ctx.beginPath();
    for (let i = 0; i < this.canvas.width; i++) {
      let y =
        this.canvas.height / 2 +
        amplitude * Math.sin(waveLength * i + frequency);
      this.ctx.lineTo(i, y);
    }
    this.ctx.strokeStyle = "#f0f0f0";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }
}
const WaveComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wave = useRef<Wave | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      wave.current = new Wave(canvasRef.current.id);
      wave.current.drawWave();

      const handleResize = () => {
        if (wave.current) {
          wave.current.canvas.width = window.innerWidth;
          wave.current.canvas.height = window.innerHeight;
          wave.current.drawWave();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return <canvas id="wave" ref={canvasRef}></canvas>;
};

export default WaveComponent;
