import { FormData } from '@/types/form';
import { clsx } from 'clsx';

interface SelloRectangularPreviewProps {
  formData: FormData;
}

const SelloRectangularPreview = ({ formData }: SelloRectangularPreviewProps) => {
  const letterSpacing = formData.letterSpacing ?? 0;

  // The image ratio is approximately 2.7:1 (width:height)
  // We'll use aspect-[27/10] for a closer match
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
        "mx-2"
      )}
      style={{
        fontFamily: formData.font || 'Arial, Helvetica, sans-serif',
        letterSpacing: `${letterSpacing}px`,
      }}
    >
      <div className="w-full text-center flex flex-col justify-center items-center gap-y-1">
        <p className="text-black text-[2.1rem] leading-tight uppercase whitespace-nowrap">
          {formData.text1 || 'Texto Principal'}
        </p>
        <p className="font-normal text-black text-[1.3rem] leading-tight whitespace-nowrap">
          {formData.text2 || 'Texto Secundario'}
        </p>
        <p className="font-normal text-black text-[1.5rem] leading-tight whitespace-nowrap">
          {formData.text3 || 'Texto Adicional'}
        </p>
      </div>
    </div>
  );
};

export default SelloRectangularPreview;