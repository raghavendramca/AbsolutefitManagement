namespace AbsoluteFitManagement.Contracts.Invoices;

public record CreateInvoiceItemRequest(
    string Description,
    string? Duration,
    string? StartDate,
    string? ExpiryDate,
    int? NumberOfSessions,
    string? SacCode,
    decimal Fee,
    decimal Discount,
    string DiscountType,
    decimal TaxRate);

public record CreateInvoicePaymentRequest(string Mode, decimal Amount);

public record CreateInvoiceRequest(
    Guid? MemberId,
    string InvoiceType,
    string SalesRepName,
    string InvoiceDate,
    List<CreateInvoiceItemRequest> Items,
    List<CreateInvoicePaymentRequest> Payments,
    string? DiscountReason,
    string? CustomerNotes,
    string? InternalNotes);
