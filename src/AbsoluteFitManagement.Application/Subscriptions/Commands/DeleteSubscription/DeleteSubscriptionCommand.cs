using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Subscriptions.Commands.DeleteSubscription;

public record DeleteSubscriptionCommand(Guid SubscriptionId) 
: IRequest<ErrorOr<Deleted>>;