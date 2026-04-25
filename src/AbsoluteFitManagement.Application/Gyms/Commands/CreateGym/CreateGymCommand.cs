using ErrorOr;
using AbsoluteFitManagement.Domain.Gyms;
using MediatR;

namespace AbsoluteFitManagement.Application.Gyms.Commands.CreateGym;

public record CreateGymCommand(string Name, Guid SubscriptionId) 
    : IRequest<ErrorOr<Gym>>;