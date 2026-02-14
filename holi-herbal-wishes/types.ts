
export interface HoliColor {
  id: string;
  name: string;
  source: string;
  description: string;
  hex: string;
  secondaryHex: string;
}

export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  previewIcon: string;
}

export interface HoliState {
  selectedColors: string[]; // IDs
  selectedDesignId: string;
  message: string;
}

export type Step = 'intro' | 'colors' | 'designs' | 'message' | 'preview';
