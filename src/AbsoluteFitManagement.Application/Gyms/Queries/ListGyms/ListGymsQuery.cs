using ErrorOr;
using AbsoluteFitManagement.Domain.Gyms;
using MediatR;

namespace AbsoluteFitManagement.Application.Gyms.Queries.ListGyms;

public record ListGymsQuery(Guid SubscriptionId) : IRequest<ErrorOr<List<Gym>>>;