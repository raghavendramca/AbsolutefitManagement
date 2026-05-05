import { api } from './client';

export interface ServiceActivityDto {
  id: string;
  name: string;
  sortOrder: number;
}

export interface ServiceCategoryDto {
  id: string;
  name: string;
  sortOrder: number;
  activities: ServiceActivityDto[];
}

export const serviceCategoriesApi = {
  list: () => api.get<ServiceCategoryDto[]>('/service-categories'),
};
