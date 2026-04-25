import { api } from './client';
import type { Room, CreateRoomRequest } from '../types';

export const roomsApi = {
  create: (gymId: string, data: CreateRoomRequest) =>
    api.post<Room>(`/gyms/${gymId}/rooms`, data),

  delete: (gymId: string, roomId: string) =>
    api.delete(`/gyms/${gymId}/rooms/${roomId}`),
};
