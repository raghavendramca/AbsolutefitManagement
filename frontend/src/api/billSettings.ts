import { api } from './client';

export interface BillSettingsDto {
  id: string;
  gymId: string;
  settingKey: string;
  settingsJson: string;
}

export type BillSettingKey =
  | 'CustomerIdHide'
  | 'BlockUserAccess'
  | 'PaymentFollowUp'
  | 'BillStartDate'
  | 'TaxNoPrefixSuffix'
  | 'InvoiceTerms';

export const billSettingsApi = {
  get: (subscriptionId: string, gymId: string, settingKey: BillSettingKey) =>
    api.get<BillSettingsDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/bill-settings?settingKey=${settingKey}`
    ),

  upsert: (subscriptionId: string, gymId: string, settingKey: BillSettingKey, settingsJson: string) =>
    api.put<BillSettingsDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/bill-settings`, {
      settingKey,
      settingsJson,
    }),
};
