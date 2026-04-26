using MediatR;
using ErrorOr;
using AbsoluteFitManagement.Domain.Subscriptions;
using AbsoluteFitManagement.Domain.Subscriptions.Factories;
using AbsoluteFitManagement.Application.Common.Interfaces;

namespace AbsoluteFitManagement.Application.Subscriptions.Commands.CreateSubscriptions;

public class CreateSubscriptionCommandHandler : IRequestHandler<CreateSubscriptionCommand, ErrorOr<Subscription>>
{
    private readonly ISubscriptionsRepository _subscriptionsRepository;
    private readonly IAdminsRepository _adminsRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly SubscriptionFactory _subscriptionFactory;

    public CreateSubscriptionCommandHandler(
        ISubscriptionsRepository subscriptionsRepository,
        IUnitOfWork unitOfWork,
        IAdminsRepository adminsRepository,
        SubscriptionFactory subscriptionFactory)
    {
        _subscriptionsRepository = subscriptionsRepository;
        _unitOfWork = unitOfWork;
        _adminsRepository = adminsRepository;
        _subscriptionFactory = subscriptionFactory;
    }

    public async Task<ErrorOr<Subscription>> Handle(CreateSubscriptionCommand request, CancellationToken cancellationToken)
    {
        var admin = await _adminsRepository.GetByIdAsync(request.AdminId);
        if (admin is null)
            return Error.NotFound(description: "Admin not found");

        if (admin.SubscriptionId is not null)
            return Error.Conflict(description: "Admin already has a subscription");

        var subscription = _subscriptionFactory.Create(
            subscriptionType: request.SubscriptionType,
            adminId: request.AdminId);

        admin.SetSubscription(subscription);

        await _subscriptionsRepository.AddSubscriptionAsync(subscription);
        await _adminsRepository.UpdateAsync(admin);
        await _unitOfWork.CommitChangesAsync();

        return subscription;
    }
}
