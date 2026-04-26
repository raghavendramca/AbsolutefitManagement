namespace AbsoluteFitManagement.Domain.Enquiries;

public class Enquiry
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }

    // Personal details
    public string FullName { get; init; } = null!;
    public string CountryCode { get; init; } = "+91";
    public string ContactNumber { get; init; } = null!;
    public string? Email { get; init; }
    public string? Gender { get; init; }

    // Trial preference
    public string TrialType { get; init; } = "NoTrial";

    // Lead information
    public DateTime EnquiryDate { get; init; }
    public string ServiceName { get; init; } = null!;
    public string? LeadSource { get; init; }

    // Follow-up scheduling
    public string? FollowUpStaffName { get; init; }
    public DateTime? FollowUpDateTime { get; init; }
    public string? CallTag { get; init; }
    public string? Message { get; init; }

    public string Status { get; set; } = "Enquiry";
    public DateTime CreatedAt { get; init; }

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
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        FullName = fullName;
        CountryCode = countryCode;
        ContactNumber = contactNumber;
        Email = email;
        Gender = gender;
        TrialType = trialType;
        EnquiryDate = enquiryDate;
        ServiceName = serviceName;
        LeadSource = leadSource;
        FollowUpStaffName = followUpStaffName;
        FollowUpDateTime = followUpDateTime;
        CallTag = callTag;
        Message = message;
        Status = "Enquiry";
        CreatedAt = DateTime.UtcNow;
    }

    public Enquiry() { }
}
