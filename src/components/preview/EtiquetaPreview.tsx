import { FormData } from '@/types/form'
import { Card, CardContent } from '../ui/card'
import { DESIGN_IMAGES } from '@/constants/designOptions'

import { clsx } from 'clsx'
import { useEffect, useState, useRef } from 'react';
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

interface EtiquetaPreviewProps {
  formData: FormData
}

const EtiquetaPreview = ({ formData }: EtiquetaPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const designImage = formData.design ? DESIGN_IMAGES[formData.design] : "/images/etiqueta/fondo-01.png"

  const [whatsappAngle, setWhatsappAngle] = useState(0);
  const [instagramAngle, setInstagramAngle] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match its display size
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Redraw when size changes
      drawOnCanvas();
    };

    // Draw the design image on the canvas
    const drawOnCanvas = () => {
      if (!ctx) return;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a circular clipping path
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
      ctx.clip();
      
      // Load and draw the background image
      const img = new Image();
      img.onload = () => {
        // Draw the image to fill the canvas while maintaining aspect ratio
        const aspectRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.width / aspectRatio;
        
        if (drawHeight < canvas.height) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * aspectRatio;
        }
        
        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;
        
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        
        // Draw the curved text after the image is loaded
        drawCurvedPhoneText();
        drawCurvedSocialText();
      };
      img.src = designImage;
    };

    // Function to draw curved phone text at the top of the canvas
    const drawCurvedPhoneText = () => {
      if (!ctx) return;
      
      const phoneText = formData.phone ? `   ${formData.phone}` : '   809-123-4567';
      
      // Calculate relative font size based on canvas width
      const fontSize = Math.max(canvas.width * 0.08, 16); // Minimum 16px, or 5% of canvas width
      
      // Set text properties
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Calculate the radius for the text arc (slightly smaller than canvas radius)
      const radius = canvas.width * 0.4;
      
      // Center point of the canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Start angle for the arc (at the top of the circle, moving clockwise)
      const startAngle = -Math.PI / 2; // -90 degrees (top of circle)
      
      // Calculate the angle span based on text length
      // Longer text needs a wider arc
      const textLength = phoneText.length;
      const angleSpan = Math.min(Math.PI * 0.7, textLength * 0.05); // Limit to 80% of half-circle
      
      // Apply letter spacing to the angle calculation
      // Increase the spacing factor based on letterSpacing value
      const spacingFactor = 2;
      
      // Calculate the starting angle for the text
      const textStartAngle = startAngle - (angleSpan * spacingFactor) / 2;

      // Draw each character along the arc
      for (let i = 0; i < textLength; i++) {
        // Calculate the angle for this character with letter spacing applied
        const charAngle = textStartAngle + ((angleSpan * spacingFactor) * i / (textLength - 1));
        
        // Calculate position
        const x = centerX + radius * Math.cos(charAngle);
        const y = centerY + radius * Math.sin(charAngle) + (canvas.width / 45); // Adjust y to center text vertically
        
        // Save the current context state
        ctx.save();
        
        // Move to the position and rotate
        ctx.translate(x, y);
        ctx.rotate(charAngle + Math.PI / 2); // Add 90 degrees to align text properly
        
        // Draw the character
        ctx.fillText(phoneText[i], 0, 0);
        
        // Restore the context state
        ctx.restore();
      }
    };

    // Function to draw curved social text at the top of the canvas
    const drawCurvedSocialText = () => {
      if (!ctx) return;

      const socialText = formData.social ? `   ${formData.social}` : '   miempresa';
      
      // Calculate relative font size based on canvas width
      const fontSize = Math.max(canvas.width * 0.08, 16); // Minimum 16px, or 5% of canvas width
      
      // Set text properties
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Calculate the radius for the text arc (slightly smaller than canvas radius)
      const radius = canvas.width * 0.4;
      
      // Center point of the canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Start angle for the arc (at the top of the circle, moving clockwise)
      const startAngle = -Math.PI / 2; // -90 degrees (top of circle)
      
      // Calculate the angle span based on text length
      // Longer text needs a wider arc
      const textLength = socialText.length;
      const angleSpan = Math.min(Math.PI * 0.7, textLength * 0.05); // Limit to 80% of half-circle
      
      // Apply letter spacing to the angle calculation
      // Increase the spacing factor based on letterSpacing value
      const spacingFactor = 2;
      
      // Calculate the starting angle for the text
      const textStartAngle = startAngle - (angleSpan * spacingFactor) / 2;

      // Draw each character along the arc
      for (let i = 0; i < textLength; i++) {
        // Calculate the angle for this character with letter spacing applied
        const charAngle = textStartAngle + ((angleSpan * spacingFactor) * i / (textLength - 1));
        
        // Calculate position
        const x = centerX + radius * Math.cos(charAngle);
        const y = centerY + radius * Math.sin(charAngle) + (canvas.width / 45); // Adjust y to center text vertically
        
        // Save the current context state
        ctx.save();
        
        // Move to the position and rotate
        ctx.translate(x, y);
        ctx.rotate(charAngle + Math.PI / 2); // Add 90 degrees to align text properly
        
        // Draw the character
        ctx.fillText(socialText[i], 0, 0);

        // Restore the context state
        ctx.restore();
      }
    };

    // Initial setup
    updateCanvasSize();
    
    // Handle window resize
    window.addEventListener('resize', updateCanvasSize);
    
    
    // Calculate icons rotation
    const phoneTextWidth = ctx.measureText(formData.phone || '   809-123-4567').width;
    const whatsappAngle = -phoneTextWidth * 0.5 - 20; // Adjust angle based on text width
    setWhatsappAngle(whatsappAngle);
   
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };

  }, [designImage, formData.phone, formData.letterSpacing]);

  return (
    <Card
      ref={cardRef}
      className={clsx(
        'etiqueta-preview',
        'w-[280px] sm:w-[400px]',
        'h-[280px] sm:h-[400px]',
        'mx-auto',
        'overflow-hidden',
        'border-2',
        'rounded-full',
        'relative',
        '!bg-transparent',
      )}
    >
      {/* Instagram icon */}
      {/* <div
        className={clsx(
          "absolute",
          "bottom-0",
          "left-1/2",
          "-translate-x-1/2",
          "z-30",
          "h-1/2",
          "flex",
          "items-end",
          "justify-center",
          "origin-top-left",
          "pb-5",
          "text-3xl sm:text-5xl",
        )}
        style={{
          transform: `rotate(10deg)`,
        }}
      >
        <FaInstagram />
      </div> */}

      {/* Whatsapp icon */}
      <div
        className={clsx(
          "whatsapp-icon",
          "absolute",
          "top-0",
          "left-1/2",
          "-translate-x-1/2",
          "z-30",
          "h-1/2",
          "flex",
          "items-start",
          "justify-center",
          "origin-bottom-left",
          "pt-4 sm:pt-5",
          "text-3xl sm:text-5xl",
        )}
        style={{
          transform: `rotate(${whatsappAngle}deg)`,
        }}
      >
        <FaWhatsapp 
          style={{ transform: `rotate(${-whatsappAngle}deg)` }} 
          // className={`debug`}
        />
      </div>

      <canvas 
        ref={canvasRef}
        className={clsx(
          'w-full',
          'h-full',
          'rounded-full'
        )}
      />
    </Card>
  )
}

export default EtiquetaPreview
