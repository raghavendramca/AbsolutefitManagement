using ErrorOr;
using AbsoluteFitManagement.Domain.Enquiries;
using MediatR;

namespace AbsoluteFitManagement.Application.Enquiries.Commands.CreateEnquiry;

public record CreateEnquiryCommand(
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
    DateTime? TrialScheduledAt,
    string? TrialService,
    string? TrialStaffName,
    string? TrialClass,
    string? TrialSession,
    string? ExtendedFieldsJson) : IRequest<ErrorOr<Enquiry>>;
