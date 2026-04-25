using ErrorOr;

namespace GymManagement.Domain.Subscriptions;

public static class SubscriptionError
{
    public static readonly Error CannotHaveMoreGymsThanSubscriptionsAllows = Error.Validation(
        "Subscription.CannotHaveMoreGymsThanSubscriptionsAllows",
        "A subscription cannot have more gym than the subscription allows."
    );

}