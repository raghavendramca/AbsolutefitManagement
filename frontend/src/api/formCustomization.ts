import { api } from './client';

export interface FormFieldConfig {
  key: string;
  isEnabled: boolean;
  isMandatory: boolean;
  hasPlugin: boolean;
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

  upsert: (subscriptionId: string, gymId: string, formType: string, fields: FormFieldConfig[]) =>
    api.put<FormCustomizationDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/form-customization`,
      { formType, fieldsJson: JSON.stringify(fields) }
    ),
};
