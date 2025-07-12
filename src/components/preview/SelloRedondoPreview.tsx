import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { FormData } from '@/types/form';

interface SelloRedondoPreviewProps {
  formData: FormData;
}

const SelloRedondoPreview = ({ formData }: SelloRedondoPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive canvas size
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      drawCircleBorder();
    };

    // Draw only the outer circle border
    const drawCircleBorder = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      // Outer circle
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        (Math.min(canvas.width, canvas.height) / 2) - 4, // 4px padding for border
        0,
        Math.PI * 2
      );
      ctx.lineWidth = 4; // Outer border thickness
      ctx.strokeStyle = '#1d4ed8';
      ctx.stroke();
      ctx.restore();

      // Inner circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        (Math.min(canvas.width, canvas.height) / 2) - 14, // 20px from edge for inner circle
        0,
        Math.PI * 2
      );
      ctx.lineWidth = 4; // Same border thickness as outer
      ctx.strokeStyle = '#1d4ed8';
      ctx.stroke();
      ctx.restore();
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'w-[250px] h-[250px] sm:w-[350px] sm:h-[350px]',
        'mx-auto',
        'relative',
        'aspect-square',
        'flex',
        'items-center',
        'justify-center',
        'bg-white',
        'overflow-hidden',
        'rounded-full',
        'border-none', // border is drawn by canvas
      )}
    >
      <canvas
        ref={canvasRef}
        className={clsx('w-full', 'h-full', 'block', 'rounded-full')}
      />
    </div>
  );
};

export default SelloRedondoPreview;