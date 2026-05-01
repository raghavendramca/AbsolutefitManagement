import { api } from './client';

export interface BillTemplateDto {
  id: string;
  gymId: string;
  state: string;
  gstNumber: string;
  businessName: string;
  isActive: boolean;
  templateJson: string | null;
}

export const billTemplatesApi = {
  list: (subscriptionId: string, gymId: string) =>
    api.get<BillTemplateDto[]>(`/subscriptions/${subscriptionId}/gyms/${gymId}/bill-templates`),

  create: (subscriptionId: string, gymId: string, state: string, gstNumber: string, businessName: string, templateJson: string | null) =>
    api.post<BillTemplateDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/bill-templates`, {
      state,
      gstNumber,
      businessName,
      templateJson,
    }),

  update: (subscriptionId: string, gymId: string, id: string, state: string, gstNumber: string, businessName: string, templateJson: string | null) =>
    api.put<BillTemplateDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/bill-templates/${id}`, {
      state,
      gstNumber,
      businessName,
      templateJson,
    }),

  toggle: (subscriptionId: string, gymId: string, id: string) =>
    api.patch<BillTemplateDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/bill-templates/${id}/toggle`, {}),
};
