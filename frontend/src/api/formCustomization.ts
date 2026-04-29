import { api } from './client';

export interface FormFieldConfig {
  key: string;
  isEnabled: boolean;
  isMandatory: boolean;
  hasPlugin: boolean;
}

export type AdditionalDetailFieldType = 'TextBox' | 'MultiLine' | 'DropDown' | 'RadioButton' | 'MultipleSelection';

export interface AdditionalDetailField {
  id: string;
  fieldType: AdditionalDetailFieldType;
  caption: string;
  placeholder: string;
  required: boolean;
  options: string[];
  showInEnquiry: boolean;
  showInMember: boolean;
}

export interface FormCustomizationDto {
  id: string;
  gymId: string;
  formType: string;
  fieldsJson: string;
}

export const formCustomizationApi = {
  get: (subscriptionId: string, gymId: string, formType: string) =>
    api.get<FormCustomizationDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/form-customization?formType=${encodeURIComponent(formType)}`
    ),

  upsert: (subscriptionId: string, gymId: string, formType: string, fields: readonly unknown[]) =>
    api.put<FormCustomizationDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/form-customization`,
      { formType, fieldsJson: JSON.stringify(fields) }
    ),
};
