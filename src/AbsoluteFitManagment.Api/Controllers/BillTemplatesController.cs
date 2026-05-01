using AbsoluteFitManagement.Application.BillTemplates.Commands.CreateBillTemplate;
using AbsoluteFitManagement.Application.BillTemplates.Commands.ToggleBillTemplate;
using AbsoluteFitManagement.Application.BillTemplates.Commands.UpdateBillTemplate;
using AbsoluteFitManagement.Application.BillTemplates.Queries.ListBillTemplates;
using AbsoluteFitManagement.Contracts.BillTemplates;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/bill-templates")]
public class BillTemplatesController : ApiController
{
    private readonly ISender _mediator;

    public BillTemplatesController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List(Guid gymId)
    {
        var result = await _mediator.Send(new ListBillTemplatesQuery(gymId));
        return result.Match(items => Ok(items.ConvertAll(ToResponse)), Problem);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBillTemplateRequest request, Guid gymId)
    {
        var result = await _mediator.Send(new CreateBillTemplateCommand(gymId, request.State, request.GstNumber, request.BusinessName, request.TemplateJson));
        return result.Match(t => Ok(ToResponse(t)), Problem);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateBillTemplateRequest request)
    {
        var result = await _mediator.Send(new UpdateBillTemplateCommand(id, request.State, request.GstNumber, request.BusinessName, request.TemplateJson));
        return result.Match(t => Ok(ToResponse(t)), Problem);
    }

    [HttpPatch("{id:guid}/toggle")]
    public async Task<IActionResult> Toggle(Guid id)
    {
        var result = await _mediator.Send(new ToggleBillTemplateCommand(id));
        return result.Match(t => Ok(ToResponse(t)), Problem);
    }

    private static BillTemplateResponse ToResponse(BillTemplate t) =>
        new(t.Id, t.GymId, t.State, t.GstNumber, t.BusinessName, t.IsActive, t.TemplateJson);
}
