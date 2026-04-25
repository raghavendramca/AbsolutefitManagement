using ErrorOr;

namespace GymManagement.Domain.Gyms;

public static class GymErrors
{
    public static readonly Error CannotHaveMoreRoomsThanSubscriptionAllows = Error.Validation(
        "Room.CannotHaveMoreRoomsThanSubscriptionAllows",
        "Room.CannotHaveMoreRoomsThanSubscriptionAllows"
    );

}