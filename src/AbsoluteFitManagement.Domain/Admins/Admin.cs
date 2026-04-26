using AbsoluteFitManagement.Domain.Common;
using AbsoluteFitManagement.Domain.Subscriptions;
using Throw;

namespace AbsoluteFitManagement.Domain.Admins;

public class Admin : Entity
{
    public Guid? SubscriptionId { get; private set; }
    private readonly Guid _userId;

    public Admin(Guid userId, Guid? subscriptionId = null, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        _userId = userId;
        SubscriptionId = subscriptionId;
    }

    protected Admin() { }

    public void SetSubscription(Subscription subscription)
    {
        SubscriptionId.HasValue.Throw().IfTrue();
        SubscriptionId = subscription.Id;
    }

    public void DeleteSubscription(Guid subscriptionId)
    {
        SubscriptionId.ThrowIfNull().IfNotEquals(subscriptionId);
        SubscriptionId = null;
    }
}
