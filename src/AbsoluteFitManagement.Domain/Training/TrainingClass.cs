namespace AbsoluteFitManagement.Domain.Training;

public class TrainingClass
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }

    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int MaxCapacity { get; set; }
    public int DurationMinutes { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; init; }

    public TrainingClass(Guid gymId, string name, int maxCapacity, int durationMinutes, string? description = null, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        Name = name;
        MaxCapacity = maxCapacity;
        DurationMinutes = durationMinutes;
        Description = description;
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
    }

    public TrainingClass() { }
}
