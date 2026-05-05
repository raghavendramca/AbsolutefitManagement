import { api } from './client';

export interface ServiceTypeConfigDto {
  id: string;
  name: string;
  sortOrder: number;
  showDaysPerWeek: boolean;
  showMonths: boolean;
  showTimeHours: boolean;
  showTimeMinutes: boolean;
  showNumberOfSessions: boolean;
  showValidityDays: boolean;
  validityDaysIsDropdown: boolean;
  showMaxMembers: boolean;
  showAccessType: boolean;
  showCategory: boolean;
  showOtpVerification: boolean;
  showUpgradable: boolean;
  showTransferable: boolean;
  showAllowFreeze: boolean;
  showFreezeDays: boolean;
  showAppointmentsApplicable: boolean;
  showRegistrationFee: boolean;
  showFeeLimits: boolean;
  showReferralBonus: boolean;
  showTermBatchDate: boolean;
}

export const serviceTypeConfigsApi = {
  list: () => api.get<ServiceTypeConfigDto[]>('/service-type-configs'),
};
