using MediatR;
using ErrorOr;
using AbsoluteFitManagement.Domain.Subscriptions;

namespace AbsoluteFitManagement.Application.Subscriptions.Commands.CreateSubscriptions;

public record CreateSubscriptionCommand(
    SubscriptionType SubscriptionType,
    Guid AdminId
) : IRequest<ErrorOr<Subscription>>;