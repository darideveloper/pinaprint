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
        'rounded-full'
      )}
    >
      <div
        className={clsx('h-32', 'bg-cover', 'bg-center')}
        style={{
          backgroundImage: designImage
            ? `url(${designImage})`
            : 'linear-gradient(to right, #4f46e5, #8b5cf6)',
        }}
      />
      <CardContent
        className={clsx('p-4')}
        style={{
          fontFamily: 'Arial',
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <div className={clsx('flex', 'justify-between', 'items-start')}>
          <div
            className={clsx(
              'w-16',
              'h-16',
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
              'text-xs',
              'text-center'
            )}
          >
            {formData.logo ? (
              <img
                src={formData.logo}
                alt='Logo'
                className={clsx('w-full', 'h-full', 'object-contain')}
              />
            ) : (
              'Logo'
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
