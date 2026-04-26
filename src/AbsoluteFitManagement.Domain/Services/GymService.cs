namespace AbsoluteFitManagement.Domain.Services;

public class GymService
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }

    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;

    public GymService(Guid gymId, string name, string? description = null, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        Name = name;
        Description = description;
        IsActive = true;
    }

    public GymService() { }
}
