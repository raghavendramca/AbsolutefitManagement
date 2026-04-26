namespace AbsoluteFitManagement.Domain.Marketing;

public class CommunicationLog
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public Guid? CampaignId { get; init; }

    // Enquiry | Member
    public string RecipientType { get; init; } = null!;
    public Guid RecipientId { get; init; }
    public string RecipientContact { get; init; } = null!;  // phone or email

    public string Channel { get; init; } = null!;          // Email | SMS | WhatsApp
    public string Message { get; init; } = null!;

    // Sent | Delivered | Failed | Read
    public string Status { get; set; } = "Sent";
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
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        CampaignId = campaignId;
        RecipientType = recipientType;
        RecipientId = recipientId;
        RecipientContact = recipientContact;
        Channel = channel;
        Message = message;
        Status = "Sent";
        SentAt = DateTime.UtcNow;
    }

    public CommunicationLog() { }
}
