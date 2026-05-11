using System.Text.Json;
using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Finance;
using MediatR;

namespace AbsoluteFitManagement.Application.Invoices.Commands.CreateInvoice;

public class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, ErrorOr<Invoice>>
{
    private readonly IInvoicesRepository _repository;
    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateInvoiceCommandHandler(
        IInvoicesRepository repository,
        IGymsRepository gymsRepository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<Invoice>> Handle(CreateInvoiceCommand request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        var invoiceNumber = await GenerateInvoiceNumberAsync(request.GymId);

        decimal subTotal = request.Items.Sum(i => i.Fee);
        decimal taxAmount = request.Items.Sum(i =>
        {
            decimal discounted = i.DiscountType == "%" ? i.Fee - (i.Fee * i.Discount / 100) : i.Fee - i.Discount;
            return discounted * i.TaxRate / 100;
        });

        decimal paidAmount = request.Payments.Sum(p => p.Amount);
        string paymentsJson = JsonSerializer.Serialize(request.Payments);

        var invoice = new Invoice(
            gymId:          request.GymId,
            invoiceNumber:  invoiceNumber,
            invoiceDate:    request.InvoiceDate,
            subTotal:       subTotal,
            taxAmount:      taxAmount,
            memberId:       request.MemberId,
            notes:          request.CustomerNotes,
            invoiceType:    request.InvoiceType,
            salesRepName:   request.SalesRepName,
            discountReason: request.DiscountReason,
            internalNotes:  request.InternalNotes,
            paidAmount:     paidAmount,
            paymentsJson:   paymentsJson);

        await _repository.AddAsync(invoice);

        foreach (var item in request.Items)
        {
            decimal discounted = item.DiscountType == "%" ? item.Fee - (item.Fee * item.Discount / 100) : item.Fee - item.Discount;
            decimal itemAmount = discounted + discounted * item.TaxRate / 100;
            var invoiceItem = new InvoiceItem(
                invoiceId:        invoice.Id,
                description:      item.Description,
                quantity:         item.NumberOfSessions ?? 1,
                unitPrice:        item.Fee,
                taxRate:          item.TaxRate,
                discount:         item.Discount,
                discountType:     item.DiscountType,
                startDate:        item.StartDate,
                expiryDate:       item.ExpiryDate,
                numberOfSessions: item.NumberOfSessions,
                sacCode:          item.SacCode,
                duration:         item.Duration);

            await _repository.AddItemAsync(invoiceItem);
        }

        await _unitOfWork.CommitChangesAsync();
        return invoice;
    }

    private async Task<string> GenerateInvoiceNumberAsync(Guid gymId)
    {
        int count = await _repository.CountByGymAsync(gymId);
        return $"INV-{count + 1:D5}";
    }
}
