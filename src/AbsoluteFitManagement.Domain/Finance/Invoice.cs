namespace AbsoluteFitManagement.Domain.Finance;

public class Invoice
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public Guid? MemberId { get; init; }

    public string InvoiceNumber { get; init; } = null!;
    public DateOnly InvoiceDate { get; set; }
    public DateOnly? DueDate { get; set; }
    public decimal SubTotal { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }

    // Draft | Sent | Paid | Overdue | Cancelled
    public string Status { get; set; } = "Draft";
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; init; }

    public Invoice(
        Guid gymId,
        string invoiceNumber,
        DateOnly invoiceDate,
        decimal subTotal,
        decimal taxAmount,
        Guid? memberId = null,
        DateOnly? dueDate = null,
        string? notes = null,
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        MemberId = memberId;
        InvoiceNumber = invoiceNumber;
        InvoiceDate = invoiceDate;
        DueDate = dueDate;
        SubTotal = subTotal;
        TaxAmount = taxAmount;
        TotalAmount = subTotal + taxAmount;
        Notes = notes;
        Status = "Draft";
        CreatedAt = DateTime.UtcNow;
    }

    public Invoice() { }
}
