using AbsoluteFitManagement.Application.Rooms.Commands.CreateRoom;
using AbsoluteFitManagement.Application.Rooms.Commands.DeleteRoom;
using AbsoluteFitManagement.Contracts.Rooms;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("gyms/{gymId:guid}/rooms")]
public class RoomsController : ApiController
{
    private readonly ISender _mediator;

    public RoomsController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRoom(
        CreateRoomRequest request,
        Guid gymId)
    {
        var command = new CreateRoomCommand(
            gymId,
            request.Name
            );
        
        var createRoomResult = await _mediator.Send(command);

        return createRoomResult.Match(
            room => Created(
                $"rooms/{room.Id}", //todo: add host
                new RoomResponse(
                    room.Id,
                    room.Name)),
            Problem);
    }

    public async Task<IActionResult> DeleteRoom(
        Guid gymId,
        Guid roomId)
    {
        var command = new DeleteRoomCommand(
            gymId,
            roomId
            );

        var deleteRoomResult = await _mediator.Send(command);

        return deleteRoomResult.Match<IActionResult>(
            room => NoContent(),
            Problem);
    }
}