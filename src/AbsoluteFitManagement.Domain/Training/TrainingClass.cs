using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Training;

public class TrainingClass : GymScopedEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int MaxCapacity { get; set; }
    public int DurationMinutes { get; set; }
    public bool IsActive { get; set; } = true;

    public TrainingClass(
        Guid gymId,
        string name,
        int maxCapacity,
        int durationMinutes,
        string? description = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        Name = name;
        MaxCapacity = maxCapacity;
        DurationMinutes = durationMinutes;
        Description = description;
        IsActive = true;
    }

    protected TrainingClass() { }
}
