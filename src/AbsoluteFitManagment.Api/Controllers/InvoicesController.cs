using AbsoluteFitManagement.Application.Invoices.Commands.CreateInvoice;
using AbsoluteFitManagement.Contracts.Invoices;
using AbsoluteFitManagement.Domain.Finance;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/invoices")]
public class InvoicesController : ApiController
{
    private readonly ISender _mediator;

    public InvoicesController(ISender mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<IActionResult> CreateInvoice(
        CreateInvoiceRequest request,
        Guid subscriptionId,
        Guid gymId)
    {
        if (!DateOnly.TryParse(request.InvoiceDate, out var invoiceDate))
            invoiceDate = DateOnly.FromDateTime(DateTime.UtcNow);

        var command = new CreateInvoiceCommand(
            GymId:          gymId,
            MemberId:       request.MemberId,
            InvoiceType:    request.InvoiceType,
            SalesRepName:   request.SalesRepName,
            InvoiceDate:    invoiceDate,
            Items:          request.Items.ConvertAll(i => new CreateInvoiceItemInput(
                                i.Description, i.Duration, i.StartDate, i.ExpiryDate,
                                i.NumberOfSessions, i.SacCode, i.Fee, i.Discount,
                                i.DiscountType, i.TaxRate)),
            Payments:       request.Payments.ConvertAll(p => new CreateInvoicePaymentInput(p.Mode, p.Amount)),
            DiscountReason: request.DiscountReason,
            CustomerNotes:  request.CustomerNotes,
            InternalNotes:  request.InternalNotes);

        var result = await _mediator.Send(command);
        return result.Match(
            invoice => CreatedAtAction(nameof(CreateInvoice), new { subscriptionId, gymId }, ToResponse(invoice)),
            Problem);
    }

    private static InvoiceResponse ToResponse(Invoice i) =>
        new(i.Id, i.InvoiceNumber, i.InvoiceType,
            i.InvoiceDate.ToString("dd-MM-yyyy"),
            i.SubTotal, i.TaxAmount, i.TotalAmount, i.PaidAmount, i.Status);
}
