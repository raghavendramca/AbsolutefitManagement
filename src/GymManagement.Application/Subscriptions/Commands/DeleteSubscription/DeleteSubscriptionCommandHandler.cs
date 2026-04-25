using ErrorOr;
using GymManagement.Application.Common.Interfaces;
using GymManagement.Application.Subscriptions.Commands.DeleteSubscription;
using MediatR;

namespace GymManagement.Application.Subscriptions.Commands.DeleteSubscription;

public class DeleteSubscriptionCommandHandler : IRequestHandler<DeleteSubscriptionCommand, ErrorOr<Deleted>>
{
    private readonly ISubscriptionsRepository _subscriptionsRepository;
    private readonly IAdminsRepository _adminsRepository;

    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteSubscriptionCommandHandler(ISubscriptionsRepository subscriptionsRepository, IAdminsRepository adminsRepository, IGymsRepository gymsRepository, IUnitOfWork unitOfWork)
    {
        _subscriptionsRepository = subscriptionsRepository;
        _adminsRepository = adminsRepository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<Deleted>> Handle(DeleteSubscriptionCommand request, CancellationToken cancellationToken)
    {
        var subscription = await _subscriptionsRepository.GetByIdAsync(request.SubscriptionId);

        if (subscription == null)
        {
            return Error.NotFound(description: "Subscription not found");
        }

        var admin = await _adminsRepository.GetByIdAsync(subscription.AdminId);

        if (admin == null)
        {
            return Error.NotFound(description: "Admin not found");
        }

        admin.DeleteSubscription(request.SubscriptionId);

        var gymsToDelete = await _gymsRepository.ListBySubscriptionIdAsync(request.SubscriptionId);

        await _adminsRepository.UpdateAsync(admin);
        await _subscriptionsRepository.RemoveSubscriptionAsync(subscription);
        await _gymsRepository.RemoveRangeAsync(gymsToDelete);
        await _unitOfWork.CommitChangesAsync();

        return Result.Deleted;
    }
}