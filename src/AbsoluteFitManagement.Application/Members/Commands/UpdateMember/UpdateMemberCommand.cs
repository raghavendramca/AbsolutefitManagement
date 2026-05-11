using ErrorOr;
using AbsoluteFitManagement.Domain.Members;
using MediatR;

namespace AbsoluteFitManagement.Application.Members.Commands.UpdateMember;

public record UpdateMemberCommand(
    Guid MemberId,
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
    string? ExtendedFieldsJson) : IRequest<ErrorOr<Member>>;
