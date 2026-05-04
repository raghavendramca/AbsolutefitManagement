using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Enquiries;

public class Enquiry : PersonEntity
{
    public int EnquiryCode { get; init; }
    public string TrialType { get; init; } = "NoTrial";
    public DateTime EnquiryDate { get; init; }
    public string ServiceName { get; init; } = null!;
    public string? LeadSource { get; init; }
    public string? FollowUpStaffName { get; init; }
    public DateTime? FollowUpDateTime { get; init; }
    public string? CallTag { get; init; }
    public string? Message { get; init; }

    public DateTime? TrialScheduledAt { get; init; }
    public string? TrialService { get; init; }
    public string? TrialStaffName { get; init; }
    public string? TrialClass { get; init; }
    public string? TrialSession { get; init; }

    public string Status { get; set; } = "Enquiry";
    public string? ExtendedFieldsJson { get; init; }

    public Enquiry(
        Guid gymId,
        int enquiryCode,
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
        string? extendedFieldsJson = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId, fullName, countryCode, contactNumber, email, gender)
    {
        EnquiryCode = enquiryCode;
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
        ExtendedFieldsJson = extendedFieldsJson;
        Status = trialType == "NoTrial" ? "Enquiry" : "TrialScheduled";
    }

    protected Enquiry() { }
}
