using AbsoluteFitManagement.Application.Members.Commands.CreateMember;
using AbsoluteFitManagement.Application.Members.Commands.UpdateMember;
using AbsoluteFitManagement.Application.Members.Queries.ListMembers;
using AbsoluteFitManagement.Contracts.Members;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/members")]
public class MembersController : ApiController
{
    private readonly ISender _mediator;

    public MembersController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateMember(
        CreateMemberRequest request,
        Guid subscriptionId,
        Guid gymId)
    {
        var command = new CreateMemberCommand(
            GymId: gymId,
            FullName: request.FullName,
            CountryCode: request.CountryCode,
            ContactNumber: request.ContactNumber,
            Email: request.Email,
            Gender: request.Gender,
            DateOfBirth: request.DateOfBirth,
            Address: request.Address,
            Locality: request.Locality,
            EmergencyContactName: request.EmergencyContactName,
            EmergencyContactPhone: request.EmergencyContactPhone,
            LeadSource: request.LeadSource,
            ExtendedFieldsJson: request.ExtendedFieldsJson,
            EnquiryId: request.EnquiryId);

        var result = await _mediator.Send(command);

        return result.Match(
            member => CreatedAtAction(
                nameof(ListMembers),
                new { subscriptionId, gymId },
                ToResponse(member)),
            Problem);
    }

    [HttpPut("{memberId:guid}")]
    public async Task<IActionResult> UpdateMember(
        UpdateMemberRequest request,
        Guid memberId,
        Guid gymId)
    {
        var command = new UpdateMemberCommand(
            MemberId: memberId,
            FullName: request.FullName,
            CountryCode: request.CountryCode,
            ContactNumber: request.ContactNumber,
            Email: request.Email,
            Gender: request.Gender,
            DateOfBirth: request.DateOfBirth,
            Address: request.Address,
            Locality: request.Locality,
            EmergencyContactName: request.EmergencyContactName,
            EmergencyContactPhone: request.EmergencyContactPhone,
            LeadSource: request.LeadSource,
            ExtendedFieldsJson: request.ExtendedFieldsJson);

        var result = await _mediator.Send(command);

        return result.Match(
            member => Ok(ToResponse(member)),
            Problem);
    }

    [HttpGet]
    public async Task<IActionResult> ListMembers(Guid gymId)
    {
        var query = new ListMembersQuery(gymId);
        var result = await _mediator.Send(query);

        return result.Match(
            members => Ok(members.ConvertAll(ToResponse)),
            Problem);
    }

    private static MemberResponse ToResponse(Domain.Members.Member m) => new(
        m.Id, m.GymId, m.FullName, m.CountryCode, m.ContactNumber,
        m.Email, m.Gender, m.DateOfBirth, m.Address, m.Locality,
        m.EmergencyContactName, m.EmergencyContactPhone,
        m.PhotoUrl, m.LeadSource, m.ExtendedFieldsJson, m.EnquiryId,
        m.JoinDate, m.Status, m.CreatedAt);
}
