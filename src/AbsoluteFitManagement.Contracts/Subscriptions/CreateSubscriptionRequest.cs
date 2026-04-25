namespace AbsoluteFitManagement.Contracts.Subscriptions;

public record CreateSubscriptionRequest(
    SubscriptionType SubscriptionType,
    Guid AdminId);
