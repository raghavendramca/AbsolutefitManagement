export interface FieldMeta {
  key: string;
  label: string;
  showMandatory: boolean;
  showPlugin: boolean;
}

export interface SectionMeta {
  title: string;
  fields: FieldMeta[];
}

// Strategy interface — each form type implements this
export interface IFormSchema {
  formType: string;
  getSections(): SectionMeta[];
}
