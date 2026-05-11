using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Finance;

public class InvoiceItem : Entity
{
    public Guid InvoiceId { get; init; }
    public string Description { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TaxRate { get; set; }
    public decimal Amount { get; set; }
    public decimal Discount { get; set; }
    public string DiscountType { get; set; } = "%";
    public string? StartDate { get; set; }
    public string? ExpiryDate { get; set; }
    public int? NumberOfSessions { get; set; }
    public string? SacCode { get; set; }
    public string? Duration { get; set; }

    public InvoiceItem(
        Guid invoiceId,
        string description,
        int quantity,
        decimal unitPrice,
        decimal taxRate = 0,
        decimal discount = 0,
        string discountType = "%",
        string? startDate = null,
        string? expiryDate = null,
        int? numberOfSessions = null,
        string? sacCode = null,
        string? duration = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        InvoiceId = invoiceId;
        Description = description;
        Quantity = quantity;
        UnitPrice = unitPrice;
        TaxRate = taxRate;
        Amount = quantity * unitPrice;
        Discount = discount;
        DiscountType = discountType;
        StartDate = startDate;
        ExpiryDate = expiryDate;
        NumberOfSessions = numberOfSessions;
        SacCode = sacCode;
        Duration = duration;
    }

    protected InvoiceItem() { }
}
