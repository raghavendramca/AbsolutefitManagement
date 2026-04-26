namespace AbsoluteFitManagement.Domain.Support;

public class SupportRequest
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public Guid? MemberId { get; init; }
    public Guid? AssignedToStaffId { get; init; }

    public string Subject { get; set; } = null!;
    public string Description { get; set; } = null!;

    // Low | Medium | High | Urgent
    public string Priority { get; set; } = "Medium";

    // Open | InProgress | Resolved | Closed
    public string Status { get; set; } = "Open";
    public DateTime? ResolvedAt { get; set; }
    public DateTime CreatedAt { get; init; }

    public SupportRequest(
        Guid gymId,
        string subject,
        string description,
        string priority = "Medium",
        Guid? memberId = null,
        Guid? assignedToStaffId = null,
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        MemberId = memberId;
        AssignedToStaffId = assignedToStaffId;
        Subject = subject;
        Description = description;
        Priority = priority;
        Status = "Open";
        CreatedAt = DateTime.UtcNow;
    }

    public SupportRequest() { }
}
