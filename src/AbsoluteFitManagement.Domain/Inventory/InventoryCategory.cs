using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Inventory;

public class InventoryCategory : GymScopedEntity
{
    public string Name { get; set; } = null!;
    public bool IsActive { get; set; } = true;

    public InventoryCategory(Guid gymId, string name, Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        Name = name;
        IsActive = true;
    }

    protected InventoryCategory() { }
}
