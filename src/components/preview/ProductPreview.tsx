import { ProductType, FormData } from '@/types/form';
import { clsx } from 'clsx';
import EtiquetaPreview from './EtiquetaPreview';
import LetreroPreview from './LetreroPreview';
import SelloRectangularPreview from './SelloRectangularPreview';
import SelloRedondoPreview from './SelloRedondoPreview';

interface ProductPreviewProps {
  productType: ProductType;
  formData: FormData;
}

const ProductPreview = ({ productType, formData }: ProductPreviewProps) => {
  const renderPreview = () => {
    switch (productType) {
      case 'etiqueta':
        return <EtiquetaPreview formData={formData} />;
      case 'letrero':
        return <LetreroPreview formData={formData} />;
      case 'sello-rectangular':
        return <SelloRectangularPreview formData={formData} />;
      case 'sello-redondo':
        return <SelloRedondoPreview formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className={clsx(
      'preview-container',
      'min-h-[300px]',
      'flex',
      'items-center',
      'justify-center',
      'p-0',
      'bg-muted/30',
      'rounded-lg',
      'animate-in',
      'fade-in-50',
      'duration-500',
    )}>
      {renderPreview()}
    </div>
  );
};

export default ProductPreview;