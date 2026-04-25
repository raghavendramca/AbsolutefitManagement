import { api } from './client';

export interface BranchResponse {
  id: string;
  branchCode: number;
  studio: string;
  locality: string;
  city: string;
  role: string;
}

export const branchesApi = {
  listBranches: (tenantId: string) =>
    api.get<BranchResponse[]>(`/tenants/${tenantId}/branches`),
};
