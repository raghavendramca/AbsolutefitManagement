import { api } from './client';
import type { Subscription, CreateSubscriptionRequest } from '../types';

export const subscriptionsApi = {
  create: (data: CreateSubscriptionRequest) =>
    api.post<Subscription>('/subscriptions', data),

  get: (subscriptionId: string) =>
    api.get<Subscription>(`/subscriptions/${subscriptionId}`),

  delete: (subscriptionId: string) =>
    api.delete(`/subscriptions/${subscriptionId}`),
};
