namespace AbsoluteFitManagement.Contracts.Subscriptions;

public record SubscriptionResponse(
    Guid Id,
    SubscriptionType SubscriptionType
);
