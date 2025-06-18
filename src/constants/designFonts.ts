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
    { value: 'helvetica', label: 'Helvetica', fontFamily: 'Helvetica' },
    { value: 'opensans', label: 'Open Sans', fontFamily: 'OpenSans' }
  ],
  'sello-redondo': [
    { value: 'montserrat', label: 'Montserrat', fontFamily: 'Montserrat' },
    { value: 'roboto', label: 'Roboto', fontFamily: 'Roboto' },
    { value: 'opensans', label: 'Open Sans', fontFamily: 'OpenSans' }
  ]
};