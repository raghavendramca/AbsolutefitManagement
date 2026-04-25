using ErrorOr;
using AbsoluteFitManagement.Domain.Rooms;
using MediatR;

namespace AbsoluteFitManagement.Application.Rooms.Commands.CreateRoom;

public record CreateRoomCommand(Guid GymId, string RoomName) 
    : IRequest<ErrorOr<Room>>;