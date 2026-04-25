namespace GymManagement.Domain.Rooms;

public class Room
{
    public Guid Id { get; }
    public string Name { get; } = null!;
    private readonly Guid _gymId;
    private readonly int _maxDailySessions;

    public Room(
        string name,
        Guid gymId,
        int maxDailySessions,
        Guid? id = null)
    {
        Name = name;
        _gymId = gymId;
        _maxDailySessions = maxDailySessions;
        Id = id ?? Guid.NewGuid();
    }
}