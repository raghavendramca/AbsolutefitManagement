using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Gyms.Commands.DeleteGym;

public record DeleteGymCommand(Guid SubscriptionId, Guid GymId) : IRequest<ErrorOr<Deleted>>;