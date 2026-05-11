namespace AbsoluteFitManagement.Contracts.Invoices;

public record InvoiceResponse(
    Guid Id,
    string InvoiceNumber,
    string InvoiceType,
    string InvoiceDate,
    decimal SubTotal,
    decimal TaxAmount,
    decimal TotalAmount,
    decimal PaidAmount,
    string Status);
