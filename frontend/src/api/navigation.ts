import { api } from './client';

export interface LoginOption {
  id: number;
  label: string;
  route: string;
}

export const navigationApi = {
  getLoginOptions: () => api.get<LoginOption[]>('/navigation/login-options'),
};
