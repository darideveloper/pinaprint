import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import ProductTypeSelector from './form/ProductTypeSelector';
import FontSelector from './form/FontSelector';
import EtiquetaForm from './form/EtiquetaForm';
import LetreroForm from './form/LetreroForm';
import SelloRectangularForm from './form/SelloRectangularForm';
import SelloRedondoForm from './form/SelloRedondoForm';
import ProductPreview from './preview/ProductPreview';
import ShareButtons from './ShareButtons';
import { Card, CardContent } from './ui/card';
import { ProductType, FormData } from '@/types/form';
import { DESIGN_FONTS } from '@/constants/designFonts';

const ProductPersonalizationForm = () => {
  const [productType, setProductType] = useState<ProductType | null>(null);
  const [formData, setFormData] = useState<FormData>({ letterSpacing: 0 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialData: FormData = { letterSpacing: 0 };
    const typeFromUrl = params.get('type') as ProductType;

    if (typeFromUrl) {
      setProductType(typeFromUrl);
      
      Array.from(params.entries()).forEach(([key, value]) => {
        if (key.startsWith(`${typeFromUrl}-`)) {
          const field = key.replace(`${typeFromUrl}-`, '');
          initialData[field] = value;
        }
      });

      const font = params.get('font');
      if (font) {
        initialData.font = font;
      } else if (typeFromUrl && DESIGN_FONTS[typeFromUrl].length > 0) {
        initialData.font = DESIGN_FONTS[typeFromUrl][0].value;
      }

      const letterSpacing = params.get('letterSpacing');
      if (letterSpacing) {
        initialData.letterSpacing = parseFloat(letterSpacing);
      }

      setFormData(initialData);

      // Check for print parameter and trigger print if true
      if (params.get('print') === 'true') {
        setTimeout(() => {
          window.print();
        }, 1000); // Small delay to ensure content is rendered
      }
    }
  }, []);

  const updateURL = (newData: FormData, type: ProductType | null) => {
    const params = new URLSearchParams(window.location.search);
    
    if (type) {
      params.set('type', type);
      
      Object.entries(newData).forEach(([key, value]) => {
        if (value !== undefined && !['font', 'letterSpacing'].includes(key)) {
          params.set(`${type}-${key}`, value.toString());
        }
      });
      
      if (newData.font) {
        params.set('font', newData.font);
      }

      if (newData.letterSpacing !== undefined) {
        params.set('letterSpacing', newData.letterSpacing.toString());
      }
      
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  const handleProductTypeChange = (type: ProductType) => {
    setProductType(type);
    const initialData = { 
      letterSpacing: 0,
      font: DESIGN_FONTS[type][0].value 
    };
    setFormData(initialData);
    updateURL(initialData, type);
  };

  const handleFormChange = (data: Partial<FormData>) => {
    const newData = { ...formData, ...data };
    setFormData(newData);
    if (productType) {
      updateURL(newData, productType);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newData = {
        ...formData,
        logo: reader.result as string
      };
      setFormData(newData);
      if (productType) {
        updateURL(newData, productType);
      }
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
        'md:gap-8'
      )}>
        <Card className={clsx(
          'lg:sticky',
          'lg:top-8',
          'print:hidden'
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

        {productType && (
          <Card className={clsx(
            'overflow-hidden',
            'print-content'
          )}>
            <CardContent className={clsx('pt-4', 'md:pt-6')}>
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
                <ShareButtons 
                  url={window.location.href}
                  title="¡Mira mi diseño personalizado!"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductPersonalizationForm;