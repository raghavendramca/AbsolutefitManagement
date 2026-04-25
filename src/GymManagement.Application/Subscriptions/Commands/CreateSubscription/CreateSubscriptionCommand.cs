using MediatR;
using ErrorOr;
using GymManagement.Domain.Subscriptions;

namespace GymManagement.Application.Subscriptions.Commands.CreateSubscriptions;

public record CreateSubscriptionCommand(
    SubscriptionType SubscriptionType,
    Guid AdminId
) : IRequest<ErrorOr<Subscription>>;