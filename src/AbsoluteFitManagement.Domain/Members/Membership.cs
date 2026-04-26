namespace AbsoluteFitManagement.Domain.Members;

public class Membership
{
    public Guid Id { get; init; }
    public Guid MemberId { get; init; }
    public Guid PlanId { get; init; }
    public Guid GymId { get; init; }

    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal AmountPaid { get; set; }

    // Pending | Paid | PartiallyPaid | Refunded
    public string PaymentStatus { get; set; } = "Pending";

    // Active | Expired | Cancelled
    public string Status { get; set; } = "Active";
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; init; }

    public Membership(
        Guid gymId,
        Guid memberId,
        Guid planId,
        DateOnly startDate,
        DateOnly endDate,
        decimal amountPaid,
        string paymentStatus = "Pending",
        string? notes = null,
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        MemberId = memberId;
        PlanId = planId;
        StartDate = startDate;
        EndDate = endDate;
        AmountPaid = amountPaid;
        PaymentStatus = paymentStatus;
        Status = "Active";
        Notes = notes;
        CreatedAt = DateTime.UtcNow;
    }

    public Membership() { }
}
