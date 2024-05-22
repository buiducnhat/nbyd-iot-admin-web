export type TFormField = {
  name: string;
  label: string;
  type:
    | 'input'
    | 'select'
    | 'textarea'
    | 'input-number'
    | 'switch'
    | 'slider'
    | 'autocomplete'
    | 'multi-select'
    | 'color-picker'
    | 'date-picker'
    | 'time-picker'
    | 'radio';
  options?: { label: string; value: string }[];
  required?: boolean;
};
