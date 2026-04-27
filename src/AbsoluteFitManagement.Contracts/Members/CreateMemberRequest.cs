namespace AbsoluteFitManagement.Contracts.Members;

public record CreateMemberRequest(
    string FullName,
    string CountryCode,
    string ContactNumber,
    string? Email,
    string? Gender,
    DateOnly? DateOfBirth,
    string? Address,
    string? Locality,
    string? EmergencyContactName,
    string? EmergencyContactPhone,
    string? LeadSource,
    string? ExtendedFieldsJson,
    Guid? EnquiryId);
