using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Support;

public class SupportRequest : GymScopedEntity
{
    public Guid? MemberId { get; init; }
    public Guid? AssignedToStaffId { get; init; }
    public string Subject { get; set; } = null!;
    public string Description { get; set; } = null!;

    // Low | Medium | High | Urgent
    public string Priority { get; set; } = "Medium";

    // Open | InProgress | Resolved | Closed
    public string Status { get; set; } = "Open";
    public DateTime? ResolvedAt { get; set; }

    public SupportRequest(
        Guid gymId,
        string subject,
        string description,
        string priority = "Medium",
        Guid? memberId = null,
        Guid? assignedToStaffId = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        MemberId = memberId;
        AssignedToStaffId = assignedToStaffId;
        Subject = subject;
        Description = description;
        Priority = priority;
        Status = "Open";
    }

    protected SupportRequest() { }
}
