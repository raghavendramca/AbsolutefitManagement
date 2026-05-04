import { api } from './client';

export interface StaffMember {
  id: string;
  staffCode: number;
  fullName: string;
  email: string | null;
  attendanceId: string | null;
  adminRights: string | null;
  designation: string | null;
  isActive: boolean;
}

export interface StaffDetail {
  id: string;
  staffCode: number;
  fullName: string;
  email: string | null;
  contactNumber: string;
  countryCode: string;
  gender: string | null;
  designation: string | null;
  adminRights: string | null;
  attendanceId: string | null;
  salary: number | null;
  joinDate: string;
  address: string | null;
  isActive: boolean;
  extendedFieldsJson: string | null;
  role: string;
}

export interface CreateStaffDto {
  fullName: string;
  contactNumber: string;
  countryCode: string;
  email?: string;
  gender?: string;
  designation?: string;
  adminRights?: string;
  attendanceId?: string;
  salary?: number;
  joinDate?: string;
  address?: string;
  extendedFieldsJson?: string;
}

export const staffApi = {
  list: (gymId: string) =>
    api.get<StaffMember[]>(`/gyms/${gymId}/staff`),

  getById: (gymId: string, id: string) =>
    api.get<StaffDetail>(`/gyms/${gymId}/staff/${id}`),

  create: (gymId: string, data: CreateStaffDto) =>
    api.post<StaffMember>(`/gyms/${gymId}/staff`, data),

  update: (gymId: string, id: string, data: CreateStaffDto) =>
    api.put<StaffMember>(`/gyms/${gymId}/staff/${id}`, data),

  toggleActive: (gymId: string, id: string) =>
    api.patch<{ id: string; isActive: boolean }>(`/gyms/${gymId}/staff/${id}/toggle-active`, {}),

  delete: (gymId: string, id: string) =>
    api.delete<void>(`/gyms/${gymId}/staff/${id}`),
};
