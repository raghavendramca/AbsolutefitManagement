import { api } from './client';

export interface CreateMemberDto {
  fullName: string;
  countryCode: string;
  contactNumber: string;
  email?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  locality?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  leadSource?: string;
  extendedFieldsJson?: string;
  enquiryId?: string;
}

export interface MemberDto {
  id: string;
  gymId: string;
  fullName: string;
  countryCode: string;
  contactNumber: string;
  email?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  locality?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  photoUrl?: string;
  leadSource?: string;
  extendedFieldsJson?: string;
  enquiryId?: string;
  joinDate: string;
  status: string;
  createdAt: string;
}

export const membersApi = {
  create: (subscriptionId: string, gymId: string, data: CreateMemberDto) =>
    api.post<MemberDto>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/members`,
      data
    ),

  list: (subscriptionId: string, gymId: string) =>
    api.get<MemberDto[]>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/members`
    ),
};
