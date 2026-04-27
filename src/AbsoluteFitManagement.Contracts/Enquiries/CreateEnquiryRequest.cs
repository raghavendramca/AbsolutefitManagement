namespace AbsoluteFitManagement.Contracts.Enquiries;

public record CreateEnquiryRequest(
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
    DateTime? TrialScheduledAt,
    string? TrialService,
    string? TrialStaffName,
    string? TrialClass,
    string? TrialSession,
    string? ExtendedFieldsJson);
