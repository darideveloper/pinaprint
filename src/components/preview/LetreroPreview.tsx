import { FormData } from '@/types/form'
import { Card, CardContent } from '../ui/card'
import { PhoneCall } from 'lucide-react'
import { clsx } from 'clsx'
import { useEffect } from 'react'

interface LetreroPreviewProps {
  formData: FormData
}

const LetreroPreview = ({ formData }: LetreroPreviewProps) => {
  const letterSpacing = formData.letterSpacing ?? 0

  /**
   * Resize text based on container width and letter-spacing.
   */
  function resizeText(containerSelector: string, textSelector: string) {
    const container = document.querySelector(containerSelector)
    const textElement = container?.querySelector(
      textSelector
    ) as HTMLElement | null
    if (!container || !textElement || !(textElement instanceof HTMLElement))
      return

    const containerWidth = (container as HTMLElement).offsetWidth
    let currentLetterSpacing = 0 // Start with normal letter-spacing

    // Reset any existing letter-spacing
    textElement.style.letterSpacing = '0px'

    // Get the text width with normal letter-spacing
    const initialTextWidth = textElement.offsetWidth

    if (initialTextWidth > containerWidth) {
      // Reduce letter-spacing (negative values)
      while (
        textElement.offsetWidth > containerWidth &&
        currentLetterSpacing > -20
      ) {
        // Adjust -5 as needed
        currentLetterSpacing -= 0.1 // Adjust the decrement step
        textElement.style.letterSpacing = `${currentLetterSpacing}px`
      }
    } else if (initialTextWidth < containerWidth) {
      // Increase letter-spacing (positive values)
      while (
        textElement.offsetWidth < containerWidth &&
        currentLetterSpacing < 100
      ) {
        // Adjust 2 as needed
        currentLetterSpacing += 0.1 // Adjust the increment step
        textElement.style.letterSpacing = `${currentLetterSpacing}px`
      }
    }
  }

  // Update text sizes based on formData
  useEffect(() => {
    resizeText('.text-wrapper', 'h3')
  }, [formData.text])

  useEffect(() => {
    resizeText('.text-wrapper', 'p')
  }, [formData.text2])

  useEffect(() => {
    resizeText('.phone-wrapper-1', 'span')
    resizeText('.phone-wrapper-2', 'span')
  }, [formData.phone1, formData.phone2])

  // Fix all text sizes when mount
  useEffect(() => {
    setTimeout(() => {
      resizeText('.text-wrapper', 'h3')
      resizeText('.text-wrapper', 'p')
      resizeText('.phone-wrapper-1', 'span')
      resizeText('.phone-wrapper-2', 'span')
    }, 100)
  }, [])

  return (
    <Card className={clsx('w-[400px]', 'h-[250px]', 'mx-auto', 'border-2', 'scale-75 sm:scale-100')}>
      <CardContent
        className={clsx(
          'pb-2',
          'pt-6',
          'h-full',
          'flex',
          'flex-col',
          'justify-center'
        )}
        style={{
          fontFamily: formData.font || 'inherit',
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <div
          className={clsx(
            'text-wrapper',
            'flex',
            'flex-col',
            'items-center',
            'text-[red]'
          )}
        >
          <h3
            className={clsx(
              formData.text2 ? 'text-7xl' : 'text-7xl',
              'font-bold',
              'text-center',
              'mb-2',
              'inline-block',
              'whitespace-nowrap',
              !formData.text2 && 'scale-y-150',
              !formData.text2 && '-translate-y-2'
            )}
          >
            {formData.text || 'SE ALQUILAN'}
          </h3>

          {(formData.text2 || !formData.text) && (
            <p
              className={clsx(
                'text-2xl',
                'text-center',
                'line-clamp-2',
                'whitespace-nowrap',
                'text-4xl',
              )}
            >
              {formData.text2}
            </p>
          )}
        </div>

        <div
          className={clsx(
            'phones-wrapper',
            'flex',
            'flex-row',
            'justify-center',
            'gap-4',
            'mt-2',
            'bg-[blue]',
            'text-white',
            formData.phone2 ? 'py-1' : 'py-4',
            'px-1'
          )}
        >
          <div
            className={clsx(
              'phone-icon-wrapper',
              'flex',
              'items-center',
              'justify-center',
              'p-2'
            )}
          >
            <PhoneCall className={clsx('w-6', 'h-6', 'text-white', '-ml-1')} />
          </div>

          <div
            className={clsx(
              'flex',
              'flex-col',
              'items-center',
              'w-11/12',
              '-ml-5'
            )}
          >
            <div
              className={clsx(
                'phone-wrapper-1',
                'flex',
                'items-center',
                'gap-2',
                'w-full',
                !formData.phone2 ? 'text-5xl' : 'text-4xl',
                !formData.phone2 && 'scale-y-150'
              )}
            >
              <span className={clsx('whitespace-nowrap')}>
                {formData.phone1 || '809-123-4567'}
              </span>
            </div>
            <div
              className={clsx(
                'phone-wrapper-2',
                'flex',
                'items-center',
                'gap-2',
                'w-full',
                'text-4xl',
                'mt-2',
                !formData.phone2 && 'hidden'
              )}
            >
              <span className={clsx('whitespace-nowrap')}>
                {formData.phone2 || '809-987-6543'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LetreroPreview
