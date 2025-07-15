import { clsx } from 'clsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DESIGN_FONTS } from '@/constants/designFonts';
import { ProductType } from '@/types/form';

interface FontSelectorProps {
  value: string | undefined;
  onChange: (value: string) => void;
  productType: ProductType;
}

const FontSelector = ({ value, onChange, productType }: FontSelectorProps) => {
  const fontOptions = DESIGN_FONTS[productType];

  const handleFontChange = (selectedValue: string) => {
    // Find the selected font option and save the fontFamily instead of the value
    const selectedFont = fontOptions.find(option => option.value === selectedValue);
    if (selectedFont) {
      onChange(selectedFont.fontFamily);
    }
  };

  // Find the current font option based on the stored fontFamily
  const currentFontOption = fontOptions.find(option => option.fontFamily === value);

  return (
    <Select
      value={currentFontOption?.value || ''}
      onValueChange={handleFontChange}
    >
      <SelectTrigger className={clsx('w-full')}>
        <SelectValue placeholder="Seleccione una fuente" />
      </SelectTrigger>
      <SelectContent>
        {fontOptions.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            style={{ fontFamily: option.fontFamily }}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontSelector;