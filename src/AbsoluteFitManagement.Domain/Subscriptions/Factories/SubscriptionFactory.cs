using AbsoluteFitManagement.Domain.Common.Factories;

namespace AbsoluteFitManagement.Domain.Subscriptions.Factories;

public class SubscriptionFactory : EntityFactory<Subscription>
{
    public Subscription Create(SubscriptionType subscriptionType, Guid adminId, Guid? id = null)
    {
        var subscription = new Subscription(subscriptionType, adminId, id);
        OnCreated(subscription);
        return subscription;
    }
}
