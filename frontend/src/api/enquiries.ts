import { api } from './client';
import type { Enquiry, CreateEnquiryRequest } from '../types';

export const enquiriesApi = {
  create: (subscriptionId: string, gymId: string, data: CreateEnquiryRequest) =>
    api.post<Enquiry>(`/subscriptions/${subscriptionId}/gyms/${gymId}/enquiries`, data),

  list: (subscriptionId: string, gymId: string) =>
    api.get<Enquiry[]>(`/subscriptions/${subscriptionId}/gyms/${gymId}/enquiries`),
};
