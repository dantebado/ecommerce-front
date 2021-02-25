export interface Field {
  placeholder?: string
  label?: string
  type?: 'text' | 'password' | 'number' | 'select' | 'radio' | 'toggle' | 'email'
  value?: string
  handler: (value: string | any) => any
  props?: any
  validation?: (v) => { valid: boolean, message?: string }
}