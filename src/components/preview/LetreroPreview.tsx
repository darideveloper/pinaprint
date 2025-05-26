import { FormData } from '@/types/form';
import { Card, CardContent } from '../ui/card';
import { PhoneIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface LetreroPreviewProps {
  formData: FormData;
}

const LetreroPreview = ({ formData }: LetreroPreviewProps) => {
  const letterSpacing = formData.letterSpacing ?? 0;

  return (
    <Card className={clsx(
      'w-[400px]',
      'h-[250px]',
      'mx-auto',
      'border-2'
    )}>
      <CardContent 
        className={clsx(
          'p-6',
          'h-full',
          'flex',
          'flex-col',
          'justify-center'
        )}
        style={{ 
          fontFamily: formData.font || 'inherit',
          letterSpacing: `${letterSpacing}px`
        }}
      >
        <h3 className={clsx(
          'text-xl',
          'font-bold',
          'text-center',
          'mb-2',
          'line-clamp-2',
          !formData.text && 'text-muted-foreground'
        )}>
          {formData.text || 'Texto Principal'}
        </h3>

        {(formData.text2 || !formData.text) && (
          <p className={clsx(
            'text-lg',
            'text-center',
            'mb-4',
            'line-clamp-2',
            !formData.text2 && 'text-muted-foreground'
          )}>
            {formData.text2 || 'Texto Secundario'}
          </p>
        )}
        
        <div className={clsx(
          'flex',
          'flex-col',
          'md:flex-row',
          'justify-center',
          'gap-4',
          'mt-2'
        )}>
          <div className={clsx(
            'flex',
            'items-center',
            'gap-2',
            'justify-center',
            'overflow-hidden'
          )}>
            <PhoneIcon className={clsx(
              'h-4',
              'w-4',
              'text-primary',
              'flex-shrink-0'
            )} />
            <span className={clsx(
              'truncate',
              !formData.phone1 && 'text-muted-foreground'
            )}>
              {formData.phone1 || '809-123-4567'}
            </span>
          </div>
          
          <div className={clsx(
            'flex',
            'items-center',
            'gap-2',
            'justify-center',
            'overflow-hidden'
          )}>
            <PhoneIcon className={clsx(
              'h-4',
              'w-4',
              'text-primary',
              'flex-shrink-0'
            )} />
            <span className={clsx(
              'truncate',
              !formData.phone2 && 'text-muted-foreground'
            )}>
              {formData.phone2 || '809-987-6543'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LetreroPreview;