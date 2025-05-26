import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from '@/types/form';
import { clsx } from 'clsx';

interface LetreroFormProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

const LetreroForm = ({ formData, onChange }: LetreroFormProps) => {
  return (
    <div className={clsx(
      'space-y-4',
      'mt-6',
      'animate-in',
      'slide-in-from-left-5',
      'duration-300'
    )}>
      <Textarea
        placeholder="Texto Principal"
        value={formData.text || ''}
        onChange={(e) => onChange({ text: e.target.value })}
        rows={2}
      />

      <Textarea
        placeholder="Texto Secundario"
        value={formData.text2 || ''}
        onChange={(e) => onChange({ text2: e.target.value })}
        rows={2}
      />
      
      <div className={clsx(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-4'
      )}>
        <Input
          type="tel"
          placeholder="Teléfono 1 (Ej. 809-123-4567)"
          value={formData.phone1 || ''}
          onChange={(e) => onChange({ phone1: e.target.value })}
        />
        
        <Input
          type="tel"
          placeholder="Teléfono 2 (Ej. 809-987-6543)"
          value={formData.phone2 || ''}
          onChange={(e) => onChange({ phone2: e.target.value })}
        />
      </div>
    </div>
  );
};

export default LetreroForm;