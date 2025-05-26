import { ProductType } from '@/types/form';

export interface FontOption {
  value: string;
  label: string;
  fontFamily: string;
}

export const DESIGN_FONTS: Record<ProductType, FontOption[]> = {
  'etiqueta': [
    { value: 'arial', label: 'Arial', fontFamily: 'Arial' }
  ],
  'letrero': [
    { value: 'montserrat', label: 'Montserrat', fontFamily: 'Montserrat' }
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