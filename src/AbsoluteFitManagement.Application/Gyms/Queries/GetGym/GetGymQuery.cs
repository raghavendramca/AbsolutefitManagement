using ErrorOr;
using AbsoluteFitManagement.Domain.Gyms;
using MediatR;

namespace AbsoluteFitManagement.Application.Gyms.Queries.GetGym;

public record GetGymQuery(Guid SubscriptionId, Guid GymId) : IRequest<ErrorOr<Gym>>;