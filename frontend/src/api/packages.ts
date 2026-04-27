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
};
