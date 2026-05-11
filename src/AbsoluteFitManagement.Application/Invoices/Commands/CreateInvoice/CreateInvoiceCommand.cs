using ErrorOr;
using AbsoluteFitManagement.Domain.Finance;
using MediatR;

namespace AbsoluteFitManagement.Application.Invoices.Commands.CreateInvoice;

public record CreateInvoiceItemInput(
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

public record CreateInvoicePaymentInput(string Mode, decimal Amount);

public record CreateInvoiceCommand(
    Guid GymId,
    Guid? MemberId,
    string InvoiceType,
    string SalesRepName,
    DateOnly InvoiceDate,
    List<CreateInvoiceItemInput> Items,
    List<CreateInvoicePaymentInput> Payments,
    string? DiscountReason,
    string? CustomerNotes,
    string? InternalNotes) : IRequest<ErrorOr<Invoice>>;
