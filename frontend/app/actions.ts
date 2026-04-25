'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as api from '@/lib/api';
import type { SubscriptionType } from '@/lib/types';

// Subscriptions
export async function createSubscriptionAction(formData: FormData) {
  const subscriptionType = formData.get('subscriptionType') as SubscriptionType;
  const adminId = formData.get('adminId') as string;
  const sub = await api.createSubscription(subscriptionType, adminId);
  revalidatePath('/subscriptions');
  redirect(`/subscriptions/${sub.id}`);
}

export async function deleteSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string;
  await api.deleteSubscription(subscriptionId);
  revalidatePath('/subscriptions');
  redirect('/subscriptions');
}

// Gyms
export async function createGymAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string;
  const name = formData.get('name') as string;
  const gym = await api.createGym(subscriptionId, name);
  revalidatePath(`/subscriptions/${subscriptionId}`);
  redirect(`/subscriptions/${subscriptionId}/gyms/${gym.id}`);
}

export async function deleteGymAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string;
  const gymId = formData.get('gymId') as string;
  await api.deleteGym(subscriptionId, gymId);
  revalidatePath(`/subscriptions/${subscriptionId}`);
  redirect(`/subscriptions/${subscriptionId}`);
}

export async function addTrainerAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string;
  const gymId = formData.get('gymId') as string;
  const trainerId = formData.get('trainerId') as string;
  await api.addTrainer(subscriptionId, gymId, trainerId);
  revalidatePath(`/subscriptions/${subscriptionId}/gyms/${gymId}`);
}

// Rooms
export async function createRoomAction(formData: FormData) {
  const gymId = formData.get('gymId') as string;
  const subscriptionId = formData.get('subscriptionId') as string;
  const name = formData.get('name') as string;
  await api.createRoom(gymId, name);
  revalidatePath(`/subscriptions/${subscriptionId}/gyms/${gymId}`);
}

export async function deleteRoomAction(formData: FormData) {
  const gymId = formData.get('gymId') as string;
  const subscriptionId = formData.get('subscriptionId') as string;
  const roomId = formData.get('roomId') as string;
  await api.deleteRoom(gymId, roomId);
  revalidatePath(`/subscriptions/${subscriptionId}/gyms/${gymId}`);
}
