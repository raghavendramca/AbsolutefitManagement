using ErrorOr;
using AbsoluteFitManagement.Domain.Subscriptions;
using MediatR;

namespace AbsoluteFitManagement.Application.Subscriptions.Queries.GetSubscription;

public record GetSubscriptionQuery(Guid subscriptionId) 
    : IRequest<ErrorOr<Subscription>>;