namespace AbsoluteFitManagement.Domain.Subscriptions.Strategies;

public class FreeSubscriptionLimitsStrategy : ISubscriptionLimitsStrategy
{
    public int MaxGyms => 1;
    public int MaxRooms => 1;
    public int MaxDailySessions => 4;
}
