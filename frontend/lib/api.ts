import type { Subscription, Gym, Room, SubscriptionType } from './types';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:5215';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API error ${res.status}: ${text}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// Subscriptions
export function createSubscription(subscriptionType: SubscriptionType, adminId: string) {
  return apiFetch<Subscription>('/subscriptions', {
    method: 'POST',
    body: JSON.stringify({ subscriptionType, adminId }),
  });
}

export function getSubscription(subscriptionId: string) {
  return apiFetch<Subscription>(`/subscriptions/${subscriptionId}`);
}

export function deleteSubscription(subscriptionId: string) {
  return apiFetch<void>(`/subscriptions/${subscriptionId}`, { method: 'DELETE' });
}

// Gyms
export function createGym(subscriptionId: string, name: string) {
  return apiFetch<Gym>(`/subscriptions/${subscriptionId}/gyms`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function listGyms(subscriptionId: string) {
  return apiFetch<Gym[]>(`/subscriptions/${subscriptionId}/gyms`);
}

export function getGym(subscriptionId: string, gymId: string) {
  return apiFetch<Gym>(`/subscriptions/${subscriptionId}/gyms/${gymId}`);
}

export function deleteGym(subscriptionId: string, gymId: string) {
  return apiFetch<void>(`/subscriptions/${subscriptionId}/gyms/${gymId}`, { method: 'DELETE' });
}

export function addTrainer(subscriptionId: string, gymId: string, trainerId: string) {
  return apiFetch<void>(`/subscriptions/${subscriptionId}/gyms/${gymId}/trainers`, {
    method: 'POST',
    body: JSON.stringify({ trainerId }),
  });
}

// Rooms
export function createRoom(gymId: string, name: string) {
  return apiFetch<Room>(`/gyms/${gymId}/rooms`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function deleteRoom(gymId: string, roomId: string) {
  return apiFetch<void>(`/gyms/${gymId}/rooms/${roomId}`, { method: 'DELETE' });
}
