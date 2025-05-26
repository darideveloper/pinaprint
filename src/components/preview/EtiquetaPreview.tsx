import { FormData } from '@/types/form'
import { Card, CardContent } from '../ui/card'
import { DESIGN_IMAGES } from '@/constants/designOptions'
import { PhoneIcon } from 'lucide-react'
import { clsx } from 'clsx'

interface EtiquetaPreviewProps {
  formData: FormData
}

const EtiquetaPreview = ({ formData }: EtiquetaPreviewProps) => {
  const designImage = formData.design ? DESIGN_IMAGES[formData.design] : null
  const letterSpacing = formData.letterSpacing ?? 0

  return (
    <Card
      className={clsx(
        'w-[400px]',
        'h-[400px]',
        'mx-auto',
        'overflow-hidden',
        'border-2',
        'rounded-full',
        'relative',
        '!bg-transparent'
      )}
    >
      <div
        className={clsx(
          'h-full',
          'bg-cover',
          'bg-center',
          'absolute',
          'z-10',
          'w-full',
          'h-full'
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
          'z-20'
        )}
        style={{
          fontFamily: 'Arial',
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <div className={clsx('flex', 'justify-between', 'items-start')}>
          <div
            className={clsx(
              'logo-wrapper',
              'w-64',
              'h-64',
              'rounded-full',
              'overflow-hidden',
              'border-2',
              'border-primary',
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
              '-translate-y-1/2',
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
            className={clsx('flex-1', 'ml-4', 'text-left', 'overflow-hidden')}
          >
            <div
              className={clsx(
                'flex',
                'items-center',
                'gap-2',
                'mb-2',
                'overflow-hidden'
              )}
            >
              <PhoneIcon
                className={clsx('h-4', 'w-4', 'text-primary', 'flex-shrink-0')}
              />
              <span
                className={clsx(
                  'font-medium',
                  'truncate',
                  !formData.phone && 'text-muted-foreground'
                )}
              >
                {formData.phone || '809-123-4567'}
              </span>
            </div>

            <div
              className={clsx('text-sm', 'text-muted-foreground', 'truncate')}
            >
              {formData.socialNetwork || '@miempresa'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EtiquetaPreview
