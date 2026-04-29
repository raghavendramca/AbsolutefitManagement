import { api } from './client';

export interface ApparelItemDto {
  id: string;
  gymId: string;
  category: string;
  name: string;
  sortOrder: number;
  isEnabled: boolean;
}

export type ApparelCategory = 'TShirtSize' | 'ShortsSize' | 'ShoesSize';

export const apparelItemsApi = {
  list: (subscriptionId: string, gymId: string, category: ApparelCategory) =>
    api.get<ApparelItemDto[]>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/apparel-items?category=${category}`
    ),
  create: (subscriptionId: string, gymId: string, category: ApparelCategory, name: string) =>
    api.post<ApparelItemDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/apparel-items`,
      { category, name }
    ),
  update: (subscriptionId: string, gymId: string, id: string, name: string) =>
    api.put<ApparelItemDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/apparel-items/${id}`,
      { name }
    ),
  toggle: (subscriptionId: string, gymId: string, id: string) =>
    api.patch<ApparelItemDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/apparel-items/${id}/toggle`,
      {}
    ),
  move: (subscriptionId: string, gymId: string, category: ApparelCategory, id: string, moveUp: boolean) =>
    api.patch<ApparelItemDto[]>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/apparel-items/${id}/move?category=${category}&moveUp=${moveUp}`,
      {}
    ),
};
