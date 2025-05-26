import { Input } from '@/components/ui/input';
import { FormData } from '@/types/form';
import { clsx } from 'clsx';

interface SelloRectangularFormProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

const SelloRectangularForm = ({ formData, onChange }: SelloRectangularFormProps) => {
  return (
    <div className={clsx(
      'space-y-2',
      'md:space-y-4',
      'mt-2',
      'md:mt-6',
      'animate-in',
      'slide-in-from-left-5',
      'duration-300'
    )}>
      <Input
        placeholder="Texto 1"
        value={formData.text1 || ''}
        onChange={(e) => onChange({ text1: e.target.value })}
      />
      
      <Input
        placeholder="Texto 2"
        value={formData.text2 || ''}
        onChange={(e) => onChange({ text2: e.target.value })}
      />
      
      <Input
        placeholder="Texto 3"
        value={formData.text3 || ''}
        onChange={(e) => onChange({ text3: e.target.value })}
      />
    </div>
  );
};

export default SelloRectangularForm;