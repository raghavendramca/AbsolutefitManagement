using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Members;

public class Member : PersonEntity
{
    public Guid? EnquiryId { get; init; }
    public DateOnly? DateOfBirth { get; set; }
    public string? Address { get; set; }
    public string? EmergencyContactName { get; set; }
    public string? EmergencyContactPhone { get; set; }
    public string? PhotoUrl { get; set; }
    public DateOnly JoinDate { get; set; }
    public string? Locality { get; set; }
    public string? LeadSource { get; set; }

    // Active | Inactive | Suspended | Expired
    public string Status { get; set; } = "Active";

    // JSON blob for configurable fields (blood group, locality, professional info, fitness, etc.)
    public string? ExtendedFieldsJson { get; set; }

    public Member(
        Guid gymId,
        string fullName,
        string contactNumber,
        DateOnly joinDate,
        string countryCode = "+91",
        string? email = null,
        string? gender = null,
        DateOnly? dateOfBirth = null,
        string? address = null,
        string? locality = null,
        string? leadSource = null,
        string? extendedFieldsJson = null,
        Guid? enquiryId = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId, fullName, countryCode, contactNumber, email, gender)
    {
        EnquiryId = enquiryId;
        DateOfBirth = dateOfBirth;
        Address = address;
        Locality = locality;
        LeadSource = leadSource;
        ExtendedFieldsJson = extendedFieldsJson;
        JoinDate = joinDate;
        Status = "Active";
    }

    protected Member() { }
}
