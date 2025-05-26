import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types/form';
import { clsx } from 'clsx';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { DESIGN_OPTIONS } from '@/constants/designOptions';
import { UploadIcon } from 'lucide-react';
import { useState } from 'react';

interface EtiquetaFormProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  onFileUpload: (file: File) => void;
}

const EtiquetaForm = ({ formData, onChange, onFileUpload }: EtiquetaFormProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className={clsx(
      'space-y-4',
      'mt-6',
      'animate-in',
      'slide-in-from-left-5',
      'duration-300',
    )}>
      <div className={clsx(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-4'
      )}>
        <Input
          type="tel"
          placeholder="Número de Teléfono (Ej. 809-123-4567)"
          value={formData.phone || ''}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
        
        <Input
          placeholder="Red Social (Ej. @miempresa)"
          value={formData.socialNetwork || ''}
          onChange={(e) => onChange({ socialNetwork: e.target.value })}
        />
      </div>

      <Select
        value={formData.design || ''}
        onValueChange={(value) => onChange({ design: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccione un diseño" />
        </SelectTrigger>
        <SelectContent>
          {DESIGN_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className={clsx(
        'flex',
        'items-center',
        'gap-4'
      )}>
        <Button
          variant="outline"
          onClick={() => document.getElementById('logo-upload')?.click()}
          className={clsx('w-full')}
        >
          <UploadIcon className={clsx(
            'mr-2',
            'h-4',
            'w-4'
          )} />
          {fileName ? 'Cambiar Logo' : 'Subir Logo'}
        </Button>
        {fileName && (
          <span className={clsx(
            'text-sm',
            'text-muted-foreground',
            'truncate',
            'max-w-[200px]'
          )}>
            {fileName}
          </span>
        )}
        <Input
          id="logo-upload"
          type="file"
          accept="image/*"
          className={clsx('hidden')}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default EtiquetaForm;