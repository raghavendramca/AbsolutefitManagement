namespace AbsoluteFitManagement.Domain.Marketing;

public class MarketingCampaign
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }

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
    public DateTime CreatedAt { get; init; }

    public MarketingCampaign(
        Guid gymId,
        string name,
        string channel,
        string content,
        string targetAudience = "All",
        string? subject = null,
        DateTime? scheduledAt = null,
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        Name = name;
        Channel = channel;
        Subject = subject;
        Content = content;
        TargetAudience = targetAudience;
        Status = "Draft";
        ScheduledAt = scheduledAt;
        CreatedAt = DateTime.UtcNow;
    }

    public MarketingCampaign() { }
}
