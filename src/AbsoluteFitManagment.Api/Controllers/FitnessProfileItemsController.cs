using AbsoluteFitManagement.Application.FitnessProfile.Commands.CreateFitnessProfileItem;
using AbsoluteFitManagement.Application.FitnessProfile.Commands.MoveFitnessProfileItem;
using AbsoluteFitManagement.Application.FitnessProfile.Commands.ToggleFitnessProfileItem;
using AbsoluteFitManagement.Application.FitnessProfile.Commands.UpdateFitnessProfileItem;
using AbsoluteFitManagement.Application.FitnessProfile.Queries.ListFitnessProfileItems;
using AbsoluteFitManagement.Contracts.FitnessProfile;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/fitness-profile-items")]
public class FitnessProfileItemsController : ApiController
{
    private readonly ISender _mediator;

    public FitnessProfileItemsController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List(Guid gymId, [FromQuery] string category)
    {
        var result = await _mediator.Send(new ListFitnessProfileItemsQuery(gymId, category));
        return result.Match(items => Ok(items.ConvertAll(ToResponse)), Problem);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateFitnessProfileItemRequest request, Guid gymId)
    {
        var result = await _mediator.Send(new CreateFitnessProfileItemCommand(gymId, request.Category, request.Name));
        return result.Match(item => Ok(ToResponse(item)), Problem);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateFitnessProfileItemRequest request)
    {
        var result = await _mediator.Send(new UpdateFitnessProfileItemCommand(id, request.Name));
        return result.Match(item => Ok(ToResponse(item)), Problem);
    }

    [HttpPatch("{id:guid}/toggle")]
    public async Task<IActionResult> Toggle(Guid id)
    {
        var result = await _mediator.Send(new ToggleFitnessProfileItemCommand(id));
        return result.Match(item => Ok(ToResponse(item)), Problem);
    }

    [HttpPatch("{id:guid}/move")]
    public async Task<IActionResult> Move(Guid id, Guid gymId, [FromQuery] string category, [FromQuery] bool moveUp)
    {
        var result = await _mediator.Send(new MoveFitnessProfileItemCommand(gymId, category, id, moveUp));
        return result.Match(items => Ok(items.ConvertAll(ToResponse)), Problem);
    }

    private static FitnessProfileItemResponse ToResponse(FitnessProfileItem item) =>
        new(item.Id, item.GymId, item.Category, item.Name, item.SortOrder, item.IsEnabled);
}
