namespace AbsoluteFitManagement.Domain.Subscriptions.Strategies;

public interface ISubscriptionLimitsStrategy
{
    int MaxGyms { get; }
    int MaxRooms { get; }
    int MaxDailySessions { get; }
}
