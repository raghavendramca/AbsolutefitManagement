namespace AbsoluteFitManagement.Contracts.Members;

public record MemberResponse(
    Guid Id,
    Guid GymId,
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
    string? PhotoUrl,
    string? LeadSource,
    string? ExtendedFieldsJson,
    Guid? EnquiryId,
    DateOnly JoinDate,
    string Status,
    DateTime CreatedAt);
