using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Inventory;

public class InventoryItem : GymScopedEntity
{
    public Guid? CategoryId { get; init; }
    public string Name { get; set; } = null!;
    public string? SKU { get; set; }
    public string Unit { get; set; } = "Pcs";
    public int QuantityInStock { get; set; }
    public int ReorderLevel { get; set; }
    public decimal UnitPrice { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;

    public InventoryItem(
        Guid gymId,
        string name,
        string unit,
        int quantityInStock,
        decimal unitPrice,
        Guid? categoryId = null,
        string? sku = null,
        int reorderLevel = 0,
        string? description = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        CategoryId = categoryId;
        Name = name;
        SKU = sku;
        Unit = unit;
        QuantityInStock = quantityInStock;
        ReorderLevel = reorderLevel;
        UnitPrice = unitPrice;
        Description = description;
        IsActive = true;
    }

    protected InventoryItem() { }
}
