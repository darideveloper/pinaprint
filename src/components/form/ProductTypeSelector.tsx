import { clsx } from 'clsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductType } from '@/types/form';
import { PRODUCT_TYPE_OPTIONS } from '@/constants/productTypes';

interface ProductTypeSelectorProps {
  value: ProductType | null;
  onChange: (value: ProductType) => void;
}

const ProductTypeSelector = ({ value, onChange }: ProductTypeSelectorProps) => {
  return (
    <Select
      value={value ?? undefined}
      onValueChange={(value) => onChange(value as ProductType)}
    >
      <SelectTrigger className={clsx('w-full')}>
        <SelectValue placeholder="Seleccione un tipo de producto" />
      </SelectTrigger>
      <SelectContent>
        {PRODUCT_TYPE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductTypeSelector;