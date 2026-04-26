namespace AbsoluteFitManagement.Domain.Subscriptions.Strategies;

public class ProSubscriptionLimitsStrategy : ISubscriptionLimitsStrategy
{
    public int MaxGyms => 3;
    public int MaxRooms => int.MaxValue;
    public int MaxDailySessions => int.MaxValue;
}
