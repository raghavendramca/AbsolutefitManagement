using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Enquiries;

public class Enquiry : PersonEntity
{
    public string TrialType { get; init; } = "NoTrial";
    public DateTime EnquiryDate { get; init; }
    public string ServiceName { get; init; } = null!;
    public string? LeadSource { get; init; }
    public string? FollowUpStaffName { get; init; }
    public DateTime? FollowUpDateTime { get; init; }
    public string? CallTag { get; init; }
    public string? Message { get; init; }

    // ── Trial scheduling ──────────────────────────────────────────────────────
    // Shared: the date (+ time for Appointment) when the trial is booked
    public DateTime? TrialScheduledAt { get; init; }

    // TrialAppointment-specific
    public string? TrialService { get; init; }
    public string? TrialStaffName { get; init; }

    // TrialClass-specific
    public string? TrialClass { get; init; }

    // TrialSession-specific
    public string? TrialSession { get; init; }

    // Enquiry | TrialScheduled | Converted | Lost
    public string Status { get; set; } = "Enquiry";

    public Enquiry(
        Guid gymId,
        string fullName,
        string countryCode,
        string contactNumber,
        string? email,
        string? gender,
        string trialType,
        DateTime enquiryDate,
        string serviceName,
        string? leadSource,
        string? followUpStaffName,
        DateTime? followUpDateTime,
        string? callTag,
        string? message,
        DateTime? trialScheduledAt,
        string? trialService,
        string? trialStaffName,
        string? trialClass,
        string? trialSession,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId, fullName, countryCode, contactNumber, email, gender)
    {
        TrialType = trialType;
        EnquiryDate = enquiryDate;
        ServiceName = serviceName;
        LeadSource = leadSource;
        FollowUpStaffName = followUpStaffName;
        FollowUpDateTime = followUpDateTime;
        CallTag = callTag;
        Message = message;
        TrialScheduledAt = trialScheduledAt;
        TrialService = trialService;
        TrialStaffName = trialStaffName;
        TrialClass = trialClass;
        TrialSession = trialSession;
        Status = trialType == "NoTrial" ? "Enquiry" : "TrialScheduled";
    }

    protected Enquiry() { }
}
