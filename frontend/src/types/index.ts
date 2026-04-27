export type SubscriptionType = 'Free' | 'Starter' | 'Pro';

export type TrialType = 'NoTrial' | 'TrialAppointment' | 'TrialClass' | 'TrialSession';
export type CallTag = 'Cold' | 'Warm' | 'Hot';
export type EnquiryStatus = 'Enquiry' | 'Member';

export interface Enquiry {
  id: string;
  gymId: string;
  fullName: string;
  countryCode: string;
  contactNumber: string;
  email?: string;
  gender?: string;
  trialType: TrialType;
  enquiryDate: string;
  serviceName: string;
  leadSource?: string;
  followUpStaffName?: string;
  followUpDateTime?: string;
  callTag?: CallTag;
  message?: string;
  // trial scheduling
  trialScheduledAt?: string;
  trialService?: string;
  trialStaffName?: string;
  trialClass?: string;
  trialSession?: string;
  extendedFieldsJson?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface CreateEnquiryRequest {
  fullName: string;
  countryCode: string;
  contactNumber: string;
  email?: string;
  gender?: string;
  trialType: TrialType;
  enquiryDate: string;
  serviceName: string;
  leadSource?: string;
  followUpStaffName?: string;
  followUpDateTime?: string;
  callTag?: CallTag;
  message?: string;
  // trial scheduling
  trialScheduledAt?: string;
  trialService?: string;
  trialStaffName?: string;
  trialClass?: string;
  trialSession?: string;
  extendedFieldsJson?: string;
}

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
