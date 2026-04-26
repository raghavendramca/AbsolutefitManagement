namespace AbsoluteFitManagement.Contracts.Enquiries;

public record EnquiryResponse(
    Guid Id,
    Guid GymId,
    string FullName,
    string CountryCode,
    string ContactNumber,
    string? Email,
    string? Gender,
    string TrialType,
    DateTime EnquiryDate,
    string ServiceName,
    string? LeadSource,
    string? FollowUpStaffName,
    DateTime? FollowUpDateTime,
    string? CallTag,
    string? Message,
    string Status,
    DateTime CreatedAt);
