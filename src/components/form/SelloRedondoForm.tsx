import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types/form';
import { clsx } from 'clsx';
import { UploadIcon } from 'lucide-react';
import { useState } from 'react';

interface SelloRedondoFormProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  onFileUpload: (file: File) => void;
}

const SelloRedondoForm = ({ formData, onChange, onFileUpload }: SelloRedondoFormProps) => {
  const [logoFileName, setLogoFileName] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className={clsx(
      'space-y-4',
      'mt-6',
      'animate-in',
      'slide-in-from-left-5',
      'duration-300'
    )}>
      <Input
        placeholder="Nombre"
        value={formData.name || ''}
        onChange={(e) => onChange({ name: e.target.value })}
      />
      
      <Input
        placeholder="RNC"
        value={formData.rnc || ''}
        onChange={(e) => onChange({ rnc: e.target.value })}
      />
      
      <Input
        placeholder="Ciudad"
        value={formData.city || ''}
        onChange={(e) => onChange({ city: e.target.value })}
      />

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
          {logoFileName ? 'Cambiar Logo' : 'Subir Logo'}
        </Button>
        {logoFileName && (
          <span className={clsx(
            'text-sm',
            'text-muted-foreground',
            'truncate',
            'max-w-[200px]'
          )}>
            {logoFileName}
          </span>
        )}
        <Input
          id="logo-upload"
          type="file"
          accept="image/*"
          className={clsx('hidden')}
          onChange={handleLogoChange}
        />
      </div>
    </div>
  );
};

export default SelloRedondoForm;