import { ProductType } from '@/types/form';

export interface FontOption {
  value: string;
  label: string;
  fontFamily: string;
}

export const DESIGN_FONTS: Record<ProductType, FontOption[]> = {
  'etiqueta': [
    { value: 'LiberationMono', label: 'LiberationMono', fontFamily: 'LiberationMono' }
  ],
  'letrero': [
    { value: 'impact', label: 'Impact', fontFamily: 'Impact' }
  ],
  'sello-rectangular': [
    { value: 'arial', label: 'Arial', fontFamily: 'Arial' },
    { value: 'monotype-corsiva', label: 'Monotype Corsiva', fontFamily: 'MonotypeCorsiva' },
    { value: 'snell', label: 'Snell', fontFamily: 'Snell' },
    { value: 'times', label: 'Times', fontFamily: 'Times' },
    { value: 'androgyne-tb', label: 'Androgyne TB', fontFamily: 'AndrogyneTB' },
  ],
  'sello-redondo': [
    { value: 'montserrat', label: 'Montserrat', fontFamily: 'Montserrat' },
    { value: 'roboto', label: 'Roboto', fontFamily: 'Roboto' },
    { value: 'opensans', label: 'Open Sans', fontFamily: 'OpenSans' }
  ]
};