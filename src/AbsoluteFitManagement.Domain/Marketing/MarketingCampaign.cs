using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Marketing;

public class MarketingCampaign : GymScopedEntity
{
    public string Name { get; set; } = null!;

    // Email | SMS | WhatsApp
    public string Channel { get; set; } = null!;
    public string? Subject { get; set; }
    public string Content { get; set; } = null!;

    // All | Enquiries | Members | Inactive | TrialScheduled
    public string TargetAudience { get; set; } = "All";

    // Draft | Scheduled | Sent | Cancelled
    public string Status { get; set; } = "Draft";
    public DateTime? ScheduledAt { get; set; }
    public DateTime? SentAt { get; set; }
    public int RecipientCount { get; set; }

    public MarketingCampaign(
        Guid gymId,
        string name,
        string channel,
        string content,
        string targetAudience = "All",
        string? subject = null,
        DateTime? scheduledAt = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        Name = name;
        Channel = channel;
        Subject = subject;
        Content = content;
        TargetAudience = targetAudience;
        Status = "Draft";
        ScheduledAt = scheduledAt;
    }

    protected MarketingCampaign() { }
}
