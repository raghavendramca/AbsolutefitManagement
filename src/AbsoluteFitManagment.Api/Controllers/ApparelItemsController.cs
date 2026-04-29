using AbsoluteFitManagement.Application.Apparel.Commands.CreateApparelItem;
using AbsoluteFitManagement.Application.Apparel.Commands.MoveApparelItem;
using AbsoluteFitManagement.Application.Apparel.Commands.ToggleApparelItem;
using AbsoluteFitManagement.Application.Apparel.Commands.UpdateApparelItem;
using AbsoluteFitManagement.Application.Apparel.Queries.ListApparelItems;
using AbsoluteFitManagement.Contracts.Apparel;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/apparel-items")]
public class ApparelItemsController : ApiController
{
    private readonly ISender _mediator;

    public ApparelItemsController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List(Guid gymId, [FromQuery] string category)
    {
        var result = await _mediator.Send(new ListApparelItemsQuery(gymId, category));
        return result.Match(items => Ok(items.ConvertAll(ToResponse)), Problem);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateApparelItemRequest request, Guid gymId)
    {
        var result = await _mediator.Send(new CreateApparelItemCommand(gymId, request.Category, request.Name));
        return result.Match(item => Ok(ToResponse(item)), Problem);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateApparelItemRequest request)
    {
        var result = await _mediator.Send(new UpdateApparelItemCommand(id, request.Name));
        return result.Match(item => Ok(ToResponse(item)), Problem);
    }

    [HttpPatch("{id:guid}/toggle")]
    public async Task<IActionResult> Toggle(Guid id)
    {
        var result = await _mediator.Send(new ToggleApparelItemCommand(id));
        return result.Match(item => Ok(ToResponse(item)), Problem);
    }

    [HttpPatch("{id:guid}/move")]
    public async Task<IActionResult> Move(Guid id, Guid gymId, [FromQuery] string category, [FromQuery] bool moveUp)
    {
        var result = await _mediator.Send(new MoveApparelItemCommand(gymId, category, id, moveUp));
        return result.Match(items => Ok(items.ConvertAll(ToResponse)), Problem);
    }

    private static ApparelItemResponse ToResponse(ApparelItem item) =>
        new(item.Id, item.GymId, item.Category, item.Name, item.SortOrder, item.IsEnabled);
}
