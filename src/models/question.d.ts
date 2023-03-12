export default interface Question {
  type: string;
  label: string;
  optionsRadio?: Array<Option>;
  optionsSelect?: string[];
  tagsToSelect: TagsToSelect,
  isYetAnswered: boolean,
  tagsRequired: string[]
  id: string
}
export interface Option {
  label: string;
  value: string;
}

export interface TagsToSelect {
  [key: string]: string
}