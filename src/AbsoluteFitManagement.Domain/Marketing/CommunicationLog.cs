using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Marketing;

public class CommunicationLog : GymScopedEntity
{
    public Guid? CampaignId { get; init; }

    // Enquiry | Member
    public string RecipientType { get; init; } = null!;
    public Guid RecipientId { get; init; }
    public string RecipientContact { get; init; } = null!;

    // Email | SMS | WhatsApp
    public string Channel { get; init; } = null!;
    public string Message { get; init; } = null!;

    // Sent | Delivered | Failed | Read
    public string Status { get; set; } = "Sent";

    // SentAt is distinct from CreatedAt: records when the message was dispatched.
    public DateTime SentAt { get; init; }

    public CommunicationLog(
        Guid gymId,
        string recipientType,
        Guid recipientId,
        string recipientContact,
        string channel,
        string message,
        Guid? campaignId = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        CampaignId = campaignId;
        RecipientType = recipientType;
        RecipientId = recipientId;
        RecipientContact = recipientContact;
        Channel = channel;
        Message = message;
        Status = "Sent";
        SentAt = DateTime.UtcNow;
    }

    protected CommunicationLog() { }
}
