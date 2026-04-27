import type { IFormSchema, SectionMeta } from './formSchema.types';
import { enquiryFormSchema } from './enquiryFormSchema';
import { memberFormSchema } from './memberFormSchema';

// Registry maps formType string to its schema strategy
const registry = new Map<string, IFormSchema>([
  [enquiryFormSchema.formType, enquiryFormSchema],
  [memberFormSchema.formType,  memberFormSchema],
]);

export function getFormSchema(formType: string): IFormSchema | undefined {
  return registry.get(formType);
}

export function getFormSections(formType: string): SectionMeta[] {
  return registry.get(formType)?.getSections() ?? [];
}

export const FORM_TABS = [
  { label: 'Enquiry Form',      formType: 'EnquiryForm'      },
  { label: 'Member Form',       formType: 'MemberForm'       },
  { label: 'Additional Details',formType: 'AdditionalDetails'},
  { label: 'Fitness Profile',   formType: 'FitnessProfile'   },
  { label: 'Apparel and Shoes', formType: 'ApparelAndShoes'  },
];
