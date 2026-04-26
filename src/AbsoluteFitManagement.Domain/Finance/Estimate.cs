namespace AbsoluteFitManagement.Domain.Finance;

public class Estimate
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public Guid? EnquiryId { get; init; }
    public Guid? MemberId { get; init; }

    public string EstimateNumber { get; init; } = null!;
    public DateOnly EstimateDate { get; set; }
    public DateOnly? ValidUntil { get; set; }
    public decimal SubTotal { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }

    // Draft | Sent | Accepted | Declined | Expired
    public string Status { get; set; } = "Draft";
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; init; }

    public Estimate(
        Guid gymId,
        string estimateNumber,
        DateOnly estimateDate,
        decimal subTotal,
        decimal taxAmount,
        Guid? enquiryId = null,
        Guid? memberId = null,
        DateOnly? validUntil = null,
        string? notes = null,
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        EnquiryId = enquiryId;
        MemberId = memberId;
        EstimateNumber = estimateNumber;
        EstimateDate = estimateDate;
        ValidUntil = validUntil;
        SubTotal = subTotal;
        TaxAmount = taxAmount;
        TotalAmount = subTotal + taxAmount;
        Notes = notes;
        Status = "Draft";
        CreatedAt = DateTime.UtcNow;
    }

    public Estimate() { }
}
