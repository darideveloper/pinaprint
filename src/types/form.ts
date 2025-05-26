export type ProductType = 'etiqueta' | 'letrero' | 'sello-rectangular' | 'sello-redondo';

export interface FormData {
  // Index signature to allow dynamic property access
  [key: string]: any; // This allows any additional properties
  // Common fields
  font?: string;
  letterSpacing?: number;
  
  // Etiqueta fields
  phone?: string;
  socialNetwork?: string;
  design?: string;
  
  
  // Letrero fields
  text?: string;
  text2?: string; // Keep this for Letrero
  phone1?: string;
  phone2?: string;
  
  // Sello rectangular fields
  text1?: string;
  // Removed text2 from Sello rectangular
  text3?: string;
  
  // Sello redondo fields
  name?: string;
  rnc?: string;
  city?: string;
  image?: string;
  logo?: string;
}
