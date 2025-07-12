import { FormData } from '@/types/form';
import { clsx } from 'clsx';

interface SelloRectangularPreviewProps {
  formData: FormData;
}

const SelloRectangularPreview = ({ formData }: SelloRectangularPreviewProps) => {
  const letterSpacing = formData.letterSpacing ?? 0;

  return (
    <div
      className={clsx(
        'border',
        'border-black',
        'bg-white',
        'w-[400px]',
        'mx-auto',
        'aspect-[30/10]', // Closer to the image's ratio
        'flex',
        'items-center',
        'justify-center',
        'p-2',
        'overflow-hidden', // Hide overflowing content
        'mx-2',
      )}
      style={{
        fontFamily: formData.font || 'Arial, Helvetica, sans-serif',
        letterSpacing: `${letterSpacing}px`,
      }}
    >
      <div className="w-full text-center flex flex-col justify-center items-center gap-y-1">
        <p
          className={clsx(
            'text-black',
            'text-2xl xs:text-4xl',
            'leading-tight',
            'uppercase',
            'whitespace-nowrap'
          )}
        >
          {formData.text1 || 'Texto Principal'}
        </p>
        <p
          className={clsx(
            'font-normal',
            'text-black',
            'text-lg xs:text-2xl',
            'leading-tight',
            'whitespace-nowrap'
          )}
        >
          {formData.text2 || 'Texto Secundario'}
        </p>
        <p
          className={clsx(
            'font-normal',
            'text-black',
            'text-lg xs:text-2xl',
            'leading-tight',
            'whitespace-nowrap'
          )}
        >
          {formData.text3 || 'Texto Adicional'}
        </p>
      </div>
    </div>
  );
};

export default SelloRectangularPreview;