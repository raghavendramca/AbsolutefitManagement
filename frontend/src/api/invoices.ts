import { api } from './client';

export interface CreateInvoiceItemRequest {
  description: string;
  duration?: string;
  startDate?: string;
  expiryDate?: string;
  numberOfSessions?: number;
  sacCode?: string;
  fee: number;
  discount: number;
  discountType: string;
  taxRate: number;
}

export interface CreateInvoicePaymentRequest {
  mode: string;
  amount: number;
}

export interface CreateInvoiceRequest {
  memberId?: string;
  invoiceType: string;
  salesRepName: string;
  invoiceDate: string;
  items: CreateInvoiceItemRequest[];
  payments: CreateInvoicePaymentRequest[];
  discountReason?: string;
  customerNotes?: string;
  internalNotes?: string;
}

export interface InvoiceResponse {
  id: string;
  invoiceNumber: string;
  invoiceType: string;
  invoiceDate: string;
  subTotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  status: string;
}

export const invoicesApi = {
  create: (subscriptionId: string, gymId: string, data: CreateInvoiceRequest) =>
    api.post<InvoiceResponse>(
      `/subscriptions/${subscriptionId}/gyms/${gymId}/invoices`,
      data
    ),
};
