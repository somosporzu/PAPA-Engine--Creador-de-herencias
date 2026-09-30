export interface Trait {
  id: string;
  name: string;
  description: string;
  ph: number;
  isCustom?: boolean;
  category?: 'Movimiento' | 'Combate' | 'Físico' | 'Mental' | 'Social' | 'Utilidad' | string;
  prerequisites?: string[];
  incompatibleWith?: string[];
  when?: string;
  effect?: string;
  limits?: string;
}

export interface Herencia {
  name: string;
  description: string;
  naturaleza: string;
  traits: Trait[];
}

export interface RuleValidation {
  isValid: boolean;
  isBalanced: boolean;
  isTraitCountValid: boolean;
  hasDisadvantage: boolean;
  hasNameAndNaturaleza: boolean;
  prerequisiteIssues: string[];
  incompatibilityIssues: string[];
}

export interface SavedHerencia {
  id: string;
  name: string;
  description: string;
  naturaleza: string;
  traits: Trait[];
  totalPH: number;
  updatedAt: number;
  isValid: boolean;
}
