namespace AbsoluteFitManagement.Domain.Inventory;

public class InventoryCategory
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public string Name { get; set; } = null!;
    public bool IsActive { get; set; } = true;

    public InventoryCategory(Guid gymId, string name, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        Name = name;
        IsActive = true;
    }

    public InventoryCategory() { }
}
