export default interface Question {
  type: string;
  label: string;
  optionsRadio?: Array<Option>;
  id: string
}
export interface Option {
  label: string;
  value: string;
}