using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Rooms.Commands.DeleteRoom;

public record DeleteRoomCommand(Guid GymId, Guid RoomId) 
    : IRequest<ErrorOr<Deleted>>;