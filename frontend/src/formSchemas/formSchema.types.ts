export interface FieldMeta {
  key: string;
  label: string;
  showMandatory: boolean;
  showPlugin: boolean;
  defaultEnabled?: boolean;   // defaults to true when omitted
  defaultMandatory?: boolean; // defaults to false when omitted
  defaultPlugin?: boolean;    // defaults to false when omitted
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
