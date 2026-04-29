import { api } from './client';

export interface FitnessProfileItemDto {
  id: string;
  gymId: string;
  category: string;
  name: string;
  sortOrder: number;
  isEnabled: boolean;
}

export type FitnessCategory = 'Level' | 'Division' | 'Certification' | 'InjuryCondition' | 'ActivityLevel';

export const fitnessProfileApi = {
  list: (subscriptionId: string, gymId: string, category: FitnessCategory) =>
    api.get<FitnessProfileItemDto[]>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/fitness-profile-items?category=${category}`
    ),
  create: (subscriptionId: string, gymId: string, category: FitnessCategory, name: string) =>
    api.post<FitnessProfileItemDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/fitness-profile-items`,
      { category, name }
    ),
  update: (subscriptionId: string, gymId: string, id: string, name: string) =>
    api.put<FitnessProfileItemDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/fitness-profile-items/${id}`,
      { name }
    ),
  toggle: (subscriptionId: string, gymId: string, id: string) =>
    api.patch<FitnessProfileItemDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/fitness-profile-items/${id}/toggle`,
      {}
    ),
  move: (subscriptionId: string, gymId: string, category: FitnessCategory, id: string, moveUp: boolean) =>
    api.patch<FitnessProfileItemDto[]>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/fitness-profile-items/${id}/move?category=${category}&moveUp=${moveUp}`,
      {}
    ),
};
