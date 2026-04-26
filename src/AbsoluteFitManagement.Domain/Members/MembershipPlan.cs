using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Members;

public class MembershipPlan : GymScopedEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int DurationMonths { get; set; }
    public decimal Price { get; set; }
    public int? SessionsIncluded { get; set; }
    public bool IsActive { get; set; } = true;

    public MembershipPlan(
        Guid gymId,
        string name,
        int durationMonths,
        decimal price,
        string? description = null,
        int? sessionsIncluded = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        Name = name;
        DurationMonths = durationMonths;
        Price = price;
        Description = description;
        SessionsIncluded = sessionsIncluded;
        IsActive = true;
    }

    protected MembershipPlan() { }
}
