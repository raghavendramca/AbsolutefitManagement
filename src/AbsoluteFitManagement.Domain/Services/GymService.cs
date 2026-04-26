using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Services;

public class GymService : GymScopedEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;

    public GymService(Guid gymId, string name, string? description = null, Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        Name = name;
        Description = description;
        IsActive = true;
    }

    protected GymService() { }
}
