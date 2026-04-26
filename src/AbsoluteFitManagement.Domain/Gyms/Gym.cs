using ErrorOr;
using AbsoluteFitManagement.Domain.Common;
using AbsoluteFitManagement.Domain.Rooms;
using Throw;

namespace AbsoluteFitManagement.Domain.Gyms;

public class Gym : Entity
{
    private readonly List<Guid> _roomIds = new();
    private readonly List<Guid> _trainerIds = new();
    private readonly int _maxRooms;

    public string Name { get; init; } = null!;
    public Guid SubscriptionId { get; init; }
    public Guid TenantId { get; init; }
    public string Locality { get; init; } = string.Empty;
    public string City { get; init; } = string.Empty;
    public int BranchCode { get; init; }

    public Gym(
        string name,
        int maxRooms,
        Guid subscriptionId,
        Guid? id = null,
        string locality = "",
        string city = "",
        int branchCode = 0)
        : base(id ?? Guid.NewGuid())
    {
        Name = name;
        _maxRooms = maxRooms;
        SubscriptionId = subscriptionId;
        TenantId = subscriptionId;
        Locality = locality;
        City = city;
        BranchCode = branchCode;
    }

    protected Gym() { }

    public bool HasRoom(Guid roomId) => _roomIds.Contains(roomId);

    public ErrorOr<Success> AddRoom(Room room)
    {
        _roomIds.Throw().IfContains(room.Id);

        if (_roomIds.Count >= _maxRooms)
            return GymErrors.CannotHaveMoreRoomsThanSubscriptionAllows;

        _roomIds.Add(room.Id);
        return Result.Success;
    }

    public ErrorOr<Success> AddTrainer(Guid trainerId)
    {
        if (_trainerIds.Contains(trainerId))
            return Error.Conflict("Trainer already added to gym");

        _trainerIds.Add(trainerId);
        return Result.Success;
    }

    public bool HasTrainer(Guid trainerId) => _trainerIds.Contains(trainerId);

    public void RemoveRoom(Guid roomId) => _roomIds.Remove(roomId);
}
