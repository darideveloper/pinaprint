import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { FormData } from '@/types/form';
import { DESIGN_FONTS } from '@/constants/designFonts';

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
        (Math.min(canvas.width, canvas.height) / 2) - 12, // 20px from edge for inner circle
        0,
        Math.PI * 2
      );
      ctx.lineWidth = 4; // Same border thickness as outer
      ctx.strokeStyle = '#1d4ed8';
      ctx.stroke();
      ctx.restore();

      // --- RNC in the center ---
      const nameText = (formData.name || 'NOMBRE DE LA EMPRESA').toUpperCase();
      // Get font family from formData.font (dynamic)
      const fontValue = formData.font || 'montserrat';
      const fontOption = DESIGN_FONTS['sello-redondo'].find(f => f.value.toLowerCase() === fontValue.toLowerCase());
      const fontFamily = fontOption ? fontOption.fontFamily : 'Montserrat';
      // Font size: visually match reference, about 9% of canvas width
      const fontSize = Math.max(canvas.width * 0.09, 18);
      ctx.save();
      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = '#1d4ed8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Radius for text: just inside the inner circle, spaced from border
      const radius = (Math.min(canvas.width, canvas.height) / 2) - 36;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      // Centered arc logic for top text
      const anglePerChar = 0.16; // radians between letters (current spacing)
      const anglePerSpace = 0.08; // radians between words (smaller spacing)
      const textLength = nameText.length;
      // Calculate totalAngle with custom spacing for spaces
      let totalAngle = 0;
      for (let i = 0; i < textLength - 1; i++) {
        totalAngle += nameText[i] === ' ' ? anglePerSpace : anglePerChar;
      }
      const centerAngle = -Math.PI / 2; // top of the circle
      const startAngle = centerAngle - totalAngle / 2;
      let currentAngle = startAngle;
      for (let i = 0; i < textLength; i++) {
        const char = nameText[i];
        const x = centerX + radius * Math.cos(currentAngle);
        const y = centerY + radius * Math.sin(currentAngle);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(currentAngle + Math.PI / 2);
        ctx.fillText(char, 0, 0);
        ctx.restore();
        // Advance angle for next character
        if (i < textLength - 1) {
          currentAngle += char === ' ' ? anglePerSpace : anglePerChar;
        }
      }
      ctx.restore();

      // --- RNC in the center ---
      const rncText = (formData.rnc || 'RNC. 000-00000-0').toUpperCase();
      // Easy to adjust offsets from center
      const RNC_OFFSET_X = 0; // px, right (+) or left (-) from center
      const RNC_OFFSET_Y = 20; // px, down (+) or up (-) from center
      const rncFontSize = fontSize * 0.9; // Slightly smaller than top text
      ctx.save();
      ctx.font = `bold ${rncFontSize}px ${fontFamily}`;
      ctx.fillStyle = '#1d4ed8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(rncText, centerX + RNC_OFFSET_X, centerY + RNC_OFFSET_Y);
      ctx.restore();

      // Draw arched city text at the bottom
      const cityText = (formData.city || 'CIUDAD O DOMICILIO').toUpperCase();
      const cityFontSize = fontSize * 0.85; // Slightly smaller font for bottom text
      ctx.save();
      ctx.font = `bold ${cityFontSize}px ${fontFamily}`;
      ctx.fillStyle = '#1d4ed8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Centered arc logic for bottom text (mirrored)
      const cityTextLength = cityText.length;
      const cityAnglePerChar = 0.12; // Smaller angle spacing for city text
      const cityAnglePerSpace = 0.06; // Smaller spacing between words for city text
      let cityTotalAngle = 0;
      for (let i = 0; i < cityTextLength - 1; i++) {
        cityTotalAngle += cityText[i] === ' ' ? cityAnglePerSpace : cityAnglePerChar;
      }
      const bottomCenterAngle = Math.PI / 2; // bottom of the circle
      const cityStartAngle = bottomCenterAngle + cityTotalAngle / 2;
      let cityCurrentAngle = cityStartAngle;
      for (let i = 0; i < cityTextLength; i++) {
        const char = cityText[i];
        const x = centerX + radius * Math.cos(cityCurrentAngle);
        const y = centerY + radius * Math.sin(cityCurrentAngle);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(cityCurrentAngle - Math.PI / 2); // mirror for bottom
        ctx.fillText(char, 0, 0);
        ctx.restore();
        // Advance angle for next character (move counterclockwise)
        if (i < cityTextLength - 1) {
          cityCurrentAngle -= char === ' ' ? cityAnglePerSpace : cityAnglePerChar;
        }
      }
      ctx.restore();

      // --- Logo between top text and RNC ---
      const logoMargin = 16; // px, space between logo and texts/circle
      const maxLogoRadius = radius - logoMargin; // radius from center to inner circle minus margin
      const maxLogoHeight = (centerY + RNC_OFFSET_Y) - (centerY - maxLogoRadius) - logoMargin; // from top of logo to RNC
      const maxLogoWidth = maxLogoRadius * 2 - logoMargin * 2;
      const logoSize = Math.min(maxLogoWidth, maxLogoHeight) * 0.8; // Make logo smaller
      // Place logo between top arc and center (above RNC)
      const topArcY = centerY - radius; // Y position of top arc
      const rncY = centerY + RNC_OFFSET_Y; // Y position of RNC
      // Interpolate Y: closer to center than to top arc
      const logoY = topArcY + (rncY - topArcY) * 0.50 - logoSize / 2;
      const logoX = centerX - logoSize / 2;
      if (formData.logo) {
        const logoImg = new window.Image();
        logoImg.onload = () => {
          ctx.save();
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          ctx.restore();
        };
        logoImg.src = formData.logo;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [formData]);

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