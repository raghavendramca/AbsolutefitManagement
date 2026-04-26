namespace AbsoluteFitManagement.Domain.Members;

public class MembershipPlan
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }

    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int DurationMonths { get; set; }
    public decimal Price { get; set; }
    public int? SessionsIncluded { get; set; }    // null = unlimited
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; init; }

    public MembershipPlan(
        Guid gymId,
        string name,
        int durationMonths,
        decimal price,
        string? description = null,
        int? sessionsIncluded = null,
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        Name = name;
        DurationMonths = durationMonths;
        Price = price;
        Description = description;
        SessionsIncluded = sessionsIncluded;
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
    }

    public MembershipPlan() { }
}
