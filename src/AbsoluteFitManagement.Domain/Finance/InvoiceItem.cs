namespace AbsoluteFitManagement.Domain.Finance;

public class InvoiceItem
{
    public Guid Id { get; init; }
    public Guid InvoiceId { get; init; }

    public string Description { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TaxRate { get; set; }       // percentage, e.g. 18 for 18%
    public decimal Amount { get; set; }        // Quantity * UnitPrice

    public InvoiceItem(Guid invoiceId, string description, int quantity, decimal unitPrice, decimal taxRate = 0, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        InvoiceId = invoiceId;
        Description = description;
        Quantity = quantity;
        UnitPrice = unitPrice;
        TaxRate = taxRate;
        Amount = quantity * unitPrice;
    }

    public InvoiceItem() { }
}
