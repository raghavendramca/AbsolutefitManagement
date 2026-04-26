using ErrorOr;
using AbsoluteFitManagement.Domain.Common;
using AbsoluteFitManagement.Domain.Gyms;
using Throw;

namespace AbsoluteFitManagement.Domain.Subscriptions;

public class Subscription : Entity
{
    private readonly List<Guid> _gymIds = new();
    private readonly int _maxGyms;

    public SubscriptionType SubscriptionType { get; private set; } = null!;
    public Guid AdminId { get; }

    public Subscription(SubscriptionType subscriptionType, Guid adminId, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        SubscriptionType = subscriptionType;
        AdminId = adminId;
        _maxGyms = GetMaxGyms();
    }

    protected Subscription() { }

    public ErrorOr<Success> AddGym(Gym gym)
    {
        _gymIds.Throw().IfContains(gym.Id);

        if (_gymIds.Count >= _maxGyms)
            return SubscriptionError.CannotHaveMoreGymsThanSubscriptionsAllows;

        _gymIds.Add(gym.Id);
        return Result.Success;
    }

    public int GetMaxGyms()
        => SubscriptionLimitsRegistry.Instance.GetStrategy(SubscriptionType).MaxGyms;

    public int GetMaxRooms()
        => SubscriptionLimitsRegistry.Instance.GetStrategy(SubscriptionType).MaxRooms;

    public int GetMaxDailySessions()
        => SubscriptionLimitsRegistry.Instance.GetStrategy(SubscriptionType).MaxDailySessions;

    public bool HasGym(Guid gymId) => _gymIds.Contains(gymId);

    public void RemoveGym(Guid gymId)
    {
        _gymIds.Throw().IfNotContains(gymId);
        _gymIds.Remove(gymId);
    }
}
