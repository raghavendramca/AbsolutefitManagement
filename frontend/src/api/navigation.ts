import { api } from './client';

export interface LoginOption {
  id: number;
  label: string;
  route: string;
}

export interface NavSectionItemDto {
  label: string;
  route?: string;
}

export interface NavSectionDto {
  label: string;
  items: NavSectionItemDto[];
}

export interface NavFlyoutDto {
  title: string;
  sections: NavSectionDto[];
}

export interface NavMenuItemDto {
  key: string;
  label: string;
  iconName: string;
  isExpandable: boolean;
  route?: string;
  flyout?: NavFlyoutDto;
}

export const navigationApi = {
  getLoginOptions: () => api.get<LoginOption[]>('/navigation/login-options'),
  getNavMenu: () => api.get<NavMenuItemDto[]>('/navigation/menu'),
};
