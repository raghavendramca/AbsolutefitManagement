using GymManagement.Domain.Subscriptions;
using Throw;

namespace GymManagement.Domain.Admins;

public class Admin
{
    public Guid Id { get; }

    public Guid? SubscriptionId { get; private set; } = null;

    private readonly Guid _userId;

    public Admin(
        Guid userId,
        Guid? subscriptionId = null,
        Guid? id = null)
    {
        _userId = userId;
        SubscriptionId = subscriptionId;
        Id = id ?? Guid.NewGuid();
    }

    private Admin()
    {
    }

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