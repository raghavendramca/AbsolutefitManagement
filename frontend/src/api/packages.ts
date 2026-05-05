import { api } from './client';

export interface GymPackageItemDto {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceFee: number;
  quantity: number;
  discount: number;
  discountType: string;
}

export interface GymPackageDto {
  id: string;
  gymId: string;
  name: string;
  isDisabledFromSelling: boolean;
  items: GymPackageItemDto[];
}

export interface CreatePackageItemRequest {
  serviceId: string;
  serviceName: string;
  serviceFee: number;
  quantity: number;
  discount: number;
  discountType: string;
}

export const packagesApi = {
  list: (subscriptionId: string, gymId: string) =>
    api.get<GymPackageDto[]>(`/subscriptions/${subscriptionId}/gyms/${gymId}/packages`),

  create: (subscriptionId: string, gymId: string, data: { name: string; items: CreatePackageItemRequest[] }) =>
    api.post<GymPackageDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/packages`, data),

  toggleSelling: (subscriptionId: string, gymId: string, packageId: string, isDisabledFromSelling: boolean) =>
    api.patch<GymPackageDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/packages/${packageId}/toggle-selling`, { isDisabledFromSelling }),

  delete: (subscriptionId: string, gymId: string, packageId: string) =>
    api.delete<void>(`/subscriptions/${subscriptionId}/gyms/${gymId}/packages/${packageId}`),
};
