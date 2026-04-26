namespace AbsoluteFitManagement.Domain.Subscriptions.Strategies;

public class StarterSubscriptionLimitsStrategy : ISubscriptionLimitsStrategy
{
    public int MaxGyms => 2;
    public int MaxRooms => 3;
    public int MaxDailySessions => int.MaxValue;
}
