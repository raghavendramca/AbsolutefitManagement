using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Rooms;

public class Room : Entity
{
    public string Name { get; } = null!;
    private readonly Guid _gymId;
    private readonly int _maxDailySessions;

    public Room(string name, Guid gymId, int maxDailySessions, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        Name = name;
        _gymId = gymId;
        _maxDailySessions = maxDailySessions;
    }

    protected Room() { }
}
