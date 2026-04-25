import { api } from './client';
import type { Gym, CreateGymRequest, AddTrainerRequest } from '../types';

export const gymsApi = {
  create: (subscriptionId: string, data: CreateGymRequest) =>
    api.post<Gym>(`/subscriptions/${subscriptionId}/gyms`, data),

  list: (subscriptionId: string) =>
    api.get<Gym[]>(`/subscriptions/${subscriptionId}/gyms`),

  get: (subscriptionId: string, gymId: string) =>
    api.get<Gym>(`/subscriptions/${subscriptionId}/gyms/${gymId}`),

  delete: (subscriptionId: string, gymId: string) =>
    api.delete(`/subscriptions/${subscriptionId}/gyms/${gymId}`),

  addTrainer: (subscriptionId: string, gymId: string, data: AddTrainerRequest) =>
    api.post<void>(`/subscriptions/${subscriptionId}/gyms/${gymId}/trainers`, data),
};
