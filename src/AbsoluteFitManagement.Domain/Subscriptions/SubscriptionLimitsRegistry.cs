using AbsoluteFitManagement.Domain.Subscriptions.Strategies;

namespace AbsoluteFitManagement.Domain.Subscriptions;

// Singleton registry that resolves limit strategies per subscription tier.
public sealed class SubscriptionLimitsRegistry
{
    private static SubscriptionLimitsRegistry? _instance;
    private static readonly object _lock = new();

    private readonly Dictionary<string, ISubscriptionLimitsStrategy> _strategies = new()
    {
        [SubscriptionType.Free.Name]    = new FreeSubscriptionLimitsStrategy(),
        [SubscriptionType.Starter.Name] = new StarterSubscriptionLimitsStrategy(),
        [SubscriptionType.Pro.Name]     = new ProSubscriptionLimitsStrategy(),
    };

    private SubscriptionLimitsRegistry() { }

    public static SubscriptionLimitsRegistry Instance
    {
        get
        {
            if (_instance is null)
            {
                lock (_lock)
                {
                    _instance ??= new SubscriptionLimitsRegistry();
                }
            }
            return _instance;
        }
    }

    public ISubscriptionLimitsStrategy GetStrategy(SubscriptionType type)
        => _strategies[type.Name];
}
