using ErrorOr;

namespace AbsoluteFitManagement.Domain.Gyms;

public static class GymErrors
{
    public static readonly Error CannotHaveMoreRoomsThanSubscriptionAllows = Error.Validation(
        "Room.CannotHaveMoreRoomsThanSubscriptionAllows",
        "Room.CannotHaveMoreRoomsThanSubscriptionAllows"
    );

}