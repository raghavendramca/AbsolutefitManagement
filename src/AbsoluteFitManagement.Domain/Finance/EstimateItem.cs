using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Finance;

public class EstimateItem : Entity
{
    public Guid EstimateId { get; init; }
    public string Description { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TaxRate { get; set; }
    public decimal Amount { get; set; }

    public EstimateItem(
        Guid estimateId,
        string description,
        int quantity,
        decimal unitPrice,
        decimal taxRate = 0,
        Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        EstimateId = estimateId;
        Description = description;
        Quantity = quantity;
        UnitPrice = unitPrice;
        TaxRate = taxRate;
        Amount = quantity * unitPrice;
    }

    protected EstimateItem() { }
}
