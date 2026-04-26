using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Members;

public class Membership : GymScopedEntity
{
    public Guid MemberId { get; init; }
    public Guid PlanId { get; init; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal AmountPaid { get; set; }

    // Pending | Paid | PartiallyPaid | Refunded
    public string PaymentStatus { get; set; } = "Pending";

    // Active | Expired | Cancelled
    public string Status { get; set; } = "Active";
    public string? Notes { get; set; }

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
        : base(id ?? Guid.NewGuid(), gymId)
    {
        MemberId = memberId;
        PlanId = planId;
        StartDate = startDate;
        EndDate = endDate;
        AmountPaid = amountPaid;
        PaymentStatus = paymentStatus;
        Status = "Active";
        Notes = notes;
    }

    protected Membership() { }
}
