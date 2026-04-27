import { api } from './client';

export interface GymServiceDto {
  id: string;
  gymId: string;
  name: string;
  description?: string;
  isActive: boolean;
  variationCount: number;
  categoryType: string;
  sacCode?: string;
  tax?: string;
}

export interface ServiceVariationDto {
  id: string;
  serviceId: string;
  serviceType: string;
  name: string;
  serviceFee: number;
  timeHours: number;
  timeMinutes: number;
  validityDays: number;
  maxMembers: number;
  tax: string;
  category: string;
  otpVerification: boolean;
  upgradable: boolean;
  transferable: boolean;
  appointmentsApplicable: boolean;
  registrationFee: boolean;
  minFeeLimit: number;
  maxFeeLimit: number;
  eligibleForReferralBonus: boolean;
  referralBonusFromPurchase: boolean;
  promoteOnline: boolean;
  isActive: boolean;
}

export interface CreateServiceRequest {
  name: string;
  description?: string;
  categoryType?: string;
  sacCode?: string;
  tax?: string;
}

export interface UpdateServiceRequest {
  name: string;
  description?: string;
  categoryType: string;
  sacCode?: string;
  tax?: string;
  isActive: boolean;
}

export interface CreateServiceVariationRequest {
  serviceType: string;
  name: string;
  serviceFee: number;
  timeHours: number;
  timeMinutes: number;
  validityDays: number;
  maxMembers: number;
  tax: string;
  category: string;
  otpVerification: boolean;
  upgradable: boolean;
  transferable: boolean;
  appointmentsApplicable: boolean;
  registrationFee: boolean;
  minFeeLimit: number;
  maxFeeLimit: number;
  eligibleForReferralBonus: boolean;
  referralBonusFromPurchase: boolean;
  promoteOnline: boolean;
}

export const servicesApi = {
  list: (subscriptionId: string, gymId: string) =>
    api.get<GymServiceDto[]>(`/subscriptions/${subscriptionId}/gyms/${gymId}/services`),

  create: (subscriptionId: string, gymId: string, data: CreateServiceRequest) =>
    api.post<GymServiceDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/services`, data),

  update: (subscriptionId: string, gymId: string, serviceId: string, data: UpdateServiceRequest) =>
    api.put<GymServiceDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/services/${serviceId}`, data),

  delete: (subscriptionId: string, gymId: string, serviceId: string) =>
    api.delete<void>(`/subscriptions/${subscriptionId}/gyms/${gymId}/services/${serviceId}`),

  listVariations: (subscriptionId: string, gymId: string, serviceId: string) =>
    api.get<ServiceVariationDto[]>(`/subscriptions/${subscriptionId}/gyms/${gymId}/services/${serviceId}/variations`),

  createVariation: (subscriptionId: string, gymId: string, serviceId: string, data: CreateServiceVariationRequest) =>
    api.post<ServiceVariationDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/services/${serviceId}/variations`, data),

  deleteVariation: (subscriptionId: string, gymId: string, serviceId: string, variationId: string) =>
    api.delete<void>(`/subscriptions/${subscriptionId}/gyms/${gymId}/services/${serviceId}/variations/${variationId}`),
};
