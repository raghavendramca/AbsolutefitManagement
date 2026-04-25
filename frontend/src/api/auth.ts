import { api } from './client';

export interface StudioLoginRequest {
  email: string;
  password: string;
}

export interface StudioLoginResponse {
  tenantId: string;
  adminId: string;
}

export const authApi = {
  studioLogin: (body: StudioLoginRequest) =>
    api.post<StudioLoginResponse>('/auth/studio/login', body),
};
