using ErrorOr;
using AbsoluteFitManagement.Domain.Members;
using MediatR;

namespace AbsoluteFitManagement.Application.Members.Commands.CreateMember;

public record CreateMemberCommand(
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
    string? LeadSource,
    string? ExtendedFieldsJson,
    Guid? EnquiryId) : IRequest<ErrorOr<Member>>;
