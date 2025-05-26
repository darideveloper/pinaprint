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
        'border-4',
        'border-primary',
        'p-6',
        'rounded-md',
        'w-[400px]',
        'h-[250px]',
        'mx-auto',
        'bg-white',
        'text-primary',
        'flex',
        'items-center'
      )}
      style={{ 
        fontFamily: formData.font || 'inherit',
        letterSpacing: `${letterSpacing}px`
      }}
    >
      <div className={clsx(
        'space-y-2',
        'text-center',
        'w-full'
      )}>
        <p className={clsx(
          'font-bold',
          'uppercase',
          'text-xl',
          'line-clamp-1',
          !formData.text2 && !formData.text3 && 'text-2xl',
          !formData.text1 && 'text-muted-foreground'
        )}>
          {formData.text1 || 'Texto Principal'}
        </p>
        
        <p className={clsx(
          'font-medium',
          'text-lg',
          'line-clamp-1',
          !formData.text2 && 'text-muted-foreground'
        )}>
          {formData.text2 || 'Texto Secundario'}
        </p>
        
        <p className={clsx(
          'text-base',
          'line-clamp-1',
          !formData.text3 && 'text-muted-foreground'
        )}>
          {formData.text3 || 'Texto Adicional'}
        </p>
      </div>
    </div>
  );
};

export default SelloRectangularPreview;