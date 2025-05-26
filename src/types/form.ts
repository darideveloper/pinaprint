export type ProductType = 'etiqueta' | 'letrero' | 'sello-rectangular' | 'sello-redondo';

export interface FormData {
  // Common fields
  font?: string;
  letterSpacing?: number;
  
  // Etiqueta fields
  phone?: string;
  socialNetwork?: string;
  design?: string;
  logo?: string;
  
  // Letrero fields
  text?: string;
  text2?: string;
  phone1?: string;
  phone2?: string;
  
  // Sello rectangular fields
  text1?: string;
  text2?: string;
  text3?: string;
  
  // Sello redondo fields
  name?: string;
  rnc?: string;
  city?: string;
  image?: string;
  logo?: string;
}