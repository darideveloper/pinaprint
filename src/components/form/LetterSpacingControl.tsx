import { Slider } from '@/components/ui/slider';
import { clsx } from 'clsx';

interface LetterSpacingControlProps {
  value: number;
  onChange: (value: number) => void;
}

const LetterSpacingControl = ({ value, onChange }: LetterSpacingControlProps) => {
  return (
    <div className={clsx('space-y-1', 'md:space-y-2')}>
      <div className={clsx('flex', 'justify-between', 'items-center')}>
        <span>Espaciado entre letras</span>
        <span className={clsx('text-sm', 'text-muted-foreground')}>
          {value}px
        </span>
      </div>
      <Slider
        min={-2}
        max={10}
        step={0.5}
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        className={clsx('w-full')}
      />
    </div>
  );
};

export default LetterSpacingControl;