import { api } from './client';

export interface StaffTargetDto {
  id: string;
  staffId: string;
  targetCategory: string;
  targetType: string;
  year: number;
  monthlyValuesJson: string;
  createdAt: string;
}

export interface CreateStaffTargetDto {
  staffId: string;
  targetCategory: string;
  targetType: string;
  year: number;
  monthlyValuesJson: string;
}

export const staffTargetsApi = {
  list: (gymId: string, params?: { staffId?: string; targetCategory?: string; targetType?: string; year?: number }) => {
    const query = new URLSearchParams();
    if (params?.staffId)        query.set('staffId', params.staffId);
    if (params?.targetCategory) query.set('targetCategory', params.targetCategory);
    if (params?.targetType)     query.set('targetType', params.targetType);
    if (params?.year)           query.set('year', String(params.year));
    const qs = query.toString();
    return api.get<StaffTargetDto[]>(`/gyms/${gymId}/staff-targets${qs ? `?${qs}` : ''}`);
  },

  create: (gymId: string, data: CreateStaffTargetDto) =>
    api.post<StaffTargetDto>(`/gyms/${gymId}/staff-targets`, data),

  delete: (gymId: string, id: string) =>
    api.delete<void>(`/gyms/${gymId}/staff-targets/${id}`),
};
