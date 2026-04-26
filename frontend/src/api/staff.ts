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

export const staffApi = {
  list: (gymId: string) =>
    api.get<StaffMember[]>(`/gyms/${gymId}/staff`),

  toggleActive: (gymId: string, id: string) =>
    api.patch<{ id: string; isActive: boolean }>(`/gyms/${gymId}/staff/${id}/toggle-active`, {}),

  delete: (gymId: string, id: string) =>
    api.delete<void>(`/gyms/${gymId}/staff/${id}`),
};
