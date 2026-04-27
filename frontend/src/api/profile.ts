import { api } from './client';

export interface GymProfileDto {
  id: string;
  gymId: string;
  country: string;
  stateRegion: string;
  city: string;
  locality: string;
  currency: string;
  region: string;
  timezone: string;
  businessType: string;
  brandName: string;
  phoneNumber: string;
  email: string;
  latitude: number;
  longitude: number;
  address: string;
  areaSqft: number;
  operatingHoursJson: string;
}

export interface OperatingHourSlot {
  closed: boolean;
  openFrom: string;
  openTo: string;
  breakFrom: string;
  breakTo: string;
}

export const profileApi = {
  get: (subscriptionId: string, gymId: string) =>
    api.get<GymProfileDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/profile`),

  update: (subscriptionId: string, gymId: string, data: Omit<GymProfileDto, 'id' | 'gymId'>) =>
    api.put<GymProfileDto>(`/subscriptions/${subscriptionId}/gyms/${gymId}/profile`, data),
};

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function parseOperatingHours(json: string): Record<string, OperatingHourSlot> {
  try { return JSON.parse(json); } catch { return {}; }
}

export function defaultHours(): Record<string, OperatingHourSlot> {
  return Object.fromEntries(
    DAYS.map(d => [d, { closed: false, openFrom: '05:00', openTo: '22:00', breakFrom: '', breakTo: '' }])
  );
}
