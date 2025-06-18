import { FormData } from '@/types/form'
import { Card, CardContent } from '../ui/card'
import { DESIGN_IMAGES } from '@/constants/designOptions'
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

import { clsx } from 'clsx'
import { useEffect, useState } from 'react';

interface EtiquetaPreviewProps {
  formData: FormData
}

const EtiquetaPreview = ({ formData }: EtiquetaPreviewProps) => {
  const designImage = formData.design ? DESIGN_IMAGES[formData.design] : "/images/etiqueta/fondo-01.png"
  const letterSpacing = 0

  const [socialNetworkAngle, setSocialNetworkAngle] = useState(40);

  
  useEffect(() => {
    // Calculate icons angle based in text width
    const socialNetworkElem = document.querySelector('.social-wrapper textPath');
    const designElem = document.querySelector('.etiqueta-preview');

    const socialNetworkWidth = socialNetworkElem ? socialNetworkElem.getComputedTextLength() : 0;
    const designWidth = designElem ? designElem.clientWidth : 0;
    let socialNetworkWidthPercentage = (socialNetworkWidth / designWidth) * 100;
    let angle = 20 + socialNetworkWidthPercentage * 0.8
    if (angle > 75) {
      angle = 75; // Limit to 60% to avoid too much rotation
    }

    setSocialNetworkAngle(angle);
  }, [formData.socialNetwork]);

  return (
    <Card
      className={clsx(
        'etiqueta-preview',
        'w-[280px] sm:w-[400px]',
        'h-[280px] sm:h-[400px]',
        'mx-auto',
        'overflow-hidden',
        'border-2',
        'rounded-full',
        'relative',
        '!bg-transparent'
      )}
    >
      {/* Instagram icon */}
      <div
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
          transform: `rotate(${socialNetworkAngle}deg)`,
        }}
      >
        <FaInstagram />
      </div>

      <div
        className={clsx(
          'bg-cover',
          'bg-center',
          'absolute',
          'z-10',
          'w-full',
          'h-full',
        )}
        style={{
          backgroundImage: designImage
            ? `url(${designImage})`
            : 'linear-gradient(to right, #4f46e5, #8b5cf6)',
        }}
      />
      <CardContent
        className={clsx(
          'p-4',
          'absolute',
          'top-0',
          'left-0',
          'w-full',
          'h-full',
          'z-20',
        )}
        style={{
          fontFamily: 'LiberationMono',
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <div className={clsx('flex', 'justify-between', 'items-start')}>
          <div
            className={clsx(
              'scale-[0.7] sm:scale-[1]',
              'logo-wrapper',
              'w-64',
              'h-64',
              'rounded-full',
              'overflow-hidden',
              'flex-shrink-0',
              'bg-white',
              'flex',
              'items-center',
              'justify-center',
              'text-muted-foreground',
              'text-xl',
              'text-center',
              'absolute',
              'top-1/2',
              'left-1/2',
              'transform',
              '-translate-x-1/2',
              '-translate-y-1/2'
            )}
          >
            {formData.logo ? (
              <img
                src={formData.logo}
                alt='Logo'
                className={clsx('w-full', 'h-full', 'object-contain')}
              />
            ) : (
              'Tu Logo Aquí'
            )}
          </div>

          <div
            className={clsx('content', 'flex-1', 'ml-4', 'text-left', 'overflow-hidden')}
          >
            <div
              className={clsx(
                'scale-[0.7] sm:scale-[1]',
                'phone-wrapper',
                'flex',
                'items-center',
                'gap-2',
                'mb-2',
                'overflow-hidden',
                'absolute',
                'top-4 sm:top-10',
                'left-1/2',
                'transform',
                '-translate-x-1/2'
              )}
            >
              <svg
                width={260}
                height={75}
                viewBox="0 0 260 60"
                style={{ display: 'block' }}
              >
                <defs>
                  <path
                    id="phoneCurve"
                    d="M20,60 A110,55 0 0,1 240,60"
                    fill="transparent"
                  />
                </defs>
                <text
                  fontSize="28"
                  fontWeight="normal"
                  fill={formData.phone ? '#000' : '#000'}
                  textAnchor="middle"
                  letterSpacing={letterSpacing}
                  fontFamily="LiberationMono"
                >
                  <textPath
                    xlinkHref="#phoneCurve"
                    startOffset="50%"
                    alignmentBaseline="middle"
                  >
                    {`${formData.phone || '809-123-4567'}`}
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Social network as inverted curve */}
            <div
              className={clsx(
                'social-wrapper',
                'scale-[0.7] sm:scale-[1]',
                'flex',
                'items-center',
                'gap-2',
                'overflow-hidden',
                'absolute',
                'bottom-3 sm:bottom-9',
                'left-1/2',
                'transform',
                '-translate-x-1/2'
              )}
            >
              <svg
                width={260}
                height={75}
                viewBox="0 0 260 60"
                style={{ display: 'block' }}
              >
                <defs>
                  <path
                    id="socialCurve"
                    d="M20,0 A110,55 0 0,0 240,0"
                    fill="transparent"
                  />
                </defs>
                <text
                  fontSize="28"
                  fontWeight="normal"
                  fill="#000"
                  textAnchor="middle"
                  letterSpacing={letterSpacing}
                  fontFamily="LiberationMono"
                >
                  <textPath
                    xlinkHref="#socialCurve"
                    startOffset="50%"
                    alignmentBaseline="middle"
                  >
                    {formData.socialNetwork || 'miempresa'}
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EtiquetaPreview
