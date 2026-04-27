using AbsoluteFitManagement.Application.Enquiries.Commands.CreateEnquiry;
using AbsoluteFitManagement.Application.Enquiries.Queries.ListEnquiries;
using AbsoluteFitManagement.Contracts.Enquiries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/enquiries")]
public class EnquiriesController : ApiController
{
    private readonly ISender _mediator;

    public EnquiriesController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateEnquiry(
        CreateEnquiryRequest request,
        Guid subscriptionId,
        Guid gymId)
    {
        var command = new CreateEnquiryCommand(
            GymId: gymId,
            FullName: request.FullName,
            CountryCode: request.CountryCode,
            ContactNumber: request.ContactNumber,
            Email: request.Email,
            Gender: request.Gender,
            TrialType: request.TrialType,
            EnquiryDate: request.EnquiryDate,
            ServiceName: request.ServiceName,
            LeadSource: request.LeadSource,
            FollowUpStaffName: request.FollowUpStaffName,
            FollowUpDateTime: request.FollowUpDateTime,
            CallTag: request.CallTag,
            Message: request.Message,
            TrialScheduledAt: request.TrialScheduledAt,
            TrialService: request.TrialService,
            TrialStaffName: request.TrialStaffName,
            TrialClass: request.TrialClass,
            TrialSession: request.TrialSession,
            ExtendedFieldsJson: request.ExtendedFieldsJson);

        var result = await _mediator.Send(command);

        return result.Match(
            enquiry => CreatedAtAction(
                nameof(ListEnquiries),
                new { subscriptionId, gymId },
                ToResponse(enquiry)),
            Problem);
    }

    [HttpGet]
    public async Task<IActionResult> ListEnquiries(Guid gymId)
    {
        var query = new ListEnquiriesQuery(gymId);
        var result = await _mediator.Send(query);

        return result.Match(
            enquiries => Ok(enquiries.ConvertAll(ToResponse)),
            Problem);
    }

    private static EnquiryResponse ToResponse(Domain.Enquiries.Enquiry e) => new(
        e.Id, e.GymId, e.FullName, e.CountryCode, e.ContactNumber, e.Email,
        e.Gender, e.TrialType, e.EnquiryDate, e.ServiceName, e.LeadSource,
        e.FollowUpStaffName, e.FollowUpDateTime, e.CallTag, e.Message,
        e.TrialScheduledAt, e.TrialService, e.TrialStaffName, e.TrialClass, e.TrialSession,
        e.ExtendedFieldsJson, e.Status, e.CreatedAt);
}
