import { FormData } from '@/types/form';
import { clsx } from 'clsx';

interface SelloRedondoPreviewProps {
  formData: FormData;
}

const SelloRedondoPreview = ({ formData }: SelloRedondoPreviewProps) => {
  const letterSpacing = formData.letterSpacing ?? 0;

  return (
    <div 
      className={clsx(
        'rounded-full',
        'border-4',
        'border-primary',
        'w-[250px]',
        'h-[250px]',
        'flex',
        'items-center',
        'justify-center',
        'bg-white',
        'text-primary',
        'p-4',
        'mx-auto',
        'relative',
        'overflow-hidden'
      )}
      style={{ 
        fontFamily: formData.font || 'inherit',
        letterSpacing: `${letterSpacing}px`
      }}
    >
      <div className={clsx(
        'text-center',
        'space-y-4',
        'w-full',
        'relative',
        'z-10'
      )}>
        {formData.logo && (
          <div className={clsx(
            'w-16',
            'h-16',
            'mx-auto',
            'mb-2'
          )}>
            <img
              src={formData.logo}
              alt="Logo"
              className={clsx(
                'w-full',
                'h-full',
                'object-contain'
              )}
            />
          </div>
        )}
        
        <div className={clsx('space-y-2')}>
          <p className={clsx(
            'font-bold',
            'uppercase',
            'text-xl',
            'line-clamp-1',
            !formData.name && 'text-muted-foreground'
          )}>
            {formData.name || 'Nombre de la Empresa'}
          </p>
          
          <p className={clsx(
            'text-sm',
            'line-clamp-1',
            !formData.rnc && 'text-muted-foreground'
          )}>
            RNC: {formData.rnc || '000-00000-0'}
          </p>
          
          <p className={clsx(
            'text-sm',
            'line-clamp-1',
            !formData.city && 'text-muted-foreground'
          )}>
            {formData.city || 'Ciudad'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelloRedondoPreview;