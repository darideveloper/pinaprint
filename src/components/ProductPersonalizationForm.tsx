import { useState } from 'react';
import { clsx } from 'clsx';
import ProductTypeSelector from './form/ProductTypeSelector';
import FontSelector from './form/FontSelector';
import EtiquetaForm from './form/EtiquetaForm';
import LetreroForm from './form/LetreroForm';
import SelloRectangularForm from './form/SelloRectangularForm';
import SelloRedondoForm from './form/SelloRedondoForm';
import ProductPreview from './preview/ProductPreview';

import { Card, CardContent } from './ui/card';
import { ProductType, FormData } from '@/types/form';
import { DESIGN_FONTS } from '@/constants/designFonts';

const ProductPersonalizationForm = () => {
  const [productType, setProductType] = useState<ProductType | null>('etiqueta');
  const [formData, setFormData] = useState<FormData>({ 
    letterSpacing: 0,
    font: DESIGN_FONTS['etiqueta'][0].value 
  });

  const handleProductTypeChange = (type: ProductType) => {
    setProductType(type);
    const initialData = { 
      letterSpacing: 0,
      font: DESIGN_FONTS[type][0].value 
    };
    setFormData(initialData);
  };

  const handleFormChange = (data: Partial<FormData>) => {
    const newData = { ...formData, ...data };
    setFormData(newData);
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newData = {
        ...formData,
        logo: reader.result as string
      };
      setFormData(newData);
    };
    reader.readAsDataURL(file);
  };

  const renderForm = () => {
    switch (productType) {
      case 'etiqueta':
        return (
          <EtiquetaForm 
            formData={formData} 
            onChange={handleFormChange} 
            onFileUpload={handleFileUpload} 
          />
        );
      case 'letrero':
        return (
          <LetreroForm 
            formData={formData} 
            onChange={handleFormChange} 
          />
        );
      case 'sello-rectangular':
        return (
          <SelloRectangularForm 
            formData={formData} 
            onChange={handleFormChange} 
          />
        );
      case 'sello-redondo':
        return (
          <SelloRedondoForm 
            formData={formData} 
            onChange={handleFormChange}
            onFileUpload={handleFileUpload}
          />
        );
      default:
        return (
          <div className={clsx(
            'flex',
            'items-center',
            'justify-center',
            'h-40',
            'text-muted-foreground'
          )}>
            Seleccione un tipo de producto para comenzar
          </div>
        );
    }
  };

  return (
    <div className={clsx(
      'space-y-4',
      'md:space-y-8',
      'animate-in',
      'fade-in-50',
      'duration-500'
    )}>
      <div className={clsx(
        'grid',
        'grid-cols-1',
        'lg:grid-cols-2',
        'gap-4',
        'md:gap-8',
        'justify-center',
        'items-center',
        'h-auto md:h-full',
      )}>
        {/* Form */}
        <Card className={clsx(
          'lg:sticky',
          'lg:top-8',
          'print:hidden',
        )}>
          <CardContent className={clsx('pt-4', 'md:pt-6', 'space-y-4', 'md:space-y-8')}>
            <div className={clsx('space-y-4', 'md:space-y-8')}>
              <ProductTypeSelector value={productType} onChange={handleProductTypeChange} />
              {productType && DESIGN_FONTS[productType].length > 1 && (
                <FontSelector
                  value={formData.font}
                  onChange={(value) => handleFormChange({ font: value })}
                  productType={productType}
                />
              )}
              {renderForm()}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        {productType && (
          <Card className={clsx(
            'overflow-hidden',
            'print-content'
          )}>
            <CardContent className={clsx('!p-2', 'md:pt-6')}>
              <h2 className={clsx(
                'text-xl',
                'font-semibold',
                'mb-2',
                'md:mb-4',
                'text-center',
                'print:hidden',
                'hidden',
                'md:block'
              )}>
                Vista Previa
              </h2>
              <ProductPreview productType={productType} formData={formData} />
              
              <div className={clsx('mt-4', 'md:mt-6')}>
                <button
                  onClick={() => window.print()}
                  className={clsx(
                    'w-full',
                    'bg-primary',
                    'text-primary-foreground',
                    'px-4',
                    'py-2',
                    'rounded-md',
                    'hover:bg-primary/90',
                    'transition-colors',
                    'font-medium',
                    'print:hidden'
                  )}
                >
                  Guardar
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductPersonalizationForm;
