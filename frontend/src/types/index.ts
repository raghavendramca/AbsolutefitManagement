export type SubscriptionType = 'Free' | 'Starter' | 'Pro';

export interface Subscription {
  id: string;
  subscriptionType: SubscriptionType;
}

export interface Gym {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  name: string;
}

export interface CreateSubscriptionRequest {
  subscriptionType: SubscriptionType;
  adminId: string;
}

export interface CreateGymRequest {
  name: string;
}

export interface CreateRoomRequest {
  name: string;
}

export interface AddTrainerRequest {
  trainerId: string;
}
