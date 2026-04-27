using AbsoluteFitManagement.Application.FormCustomization.Commands.UpsertFormCustomization;
using AbsoluteFitManagement.Application.FormCustomization.Queries.GetFormCustomization;
using AbsoluteFitManagement.Contracts.FormCustomization;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/form-customization")]
public class FormCustomizationController : ApiController
{
    private readonly ISender _mediator;

    public FormCustomizationController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get(Guid gymId, [FromQuery] string formType = "EnquiryForm")
    {
        var result = await _mediator.Send(new GetFormCustomizationQuery(gymId, formType));
        return result.Match(c => Ok(ToResponse(c)), Problem);
    }

    [HttpPut]
    public async Task<IActionResult> Upsert([FromBody] UpsertFormCustomizationRequest request, Guid gymId)
    {
        var command = new UpsertFormCustomizationCommand(gymId, request.FormType, request.FieldsJson);
        var result = await _mediator.Send(command);
        return result.Match(c => Ok(ToResponse(c)), Problem);
    }

    private static FormCustomizationResponse ToResponse(FormCustomization c) =>
        new(c.Id, c.GymId, c.FormType, c.FieldsJson);
}
