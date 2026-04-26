namespace AbsoluteFitManagement.Domain.Inventory;

public class InventoryItem
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public Guid? CategoryId { get; init; }

    public string Name { get; set; } = null!;
    public string? SKU { get; set; }
    public string Unit { get; set; } = "Pcs";     // Pcs | Kg | Ltr | Box | Set
    public int QuantityInStock { get; set; }
    public int ReorderLevel { get; set; }
    public decimal UnitPrice { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; init; }

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
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        CategoryId = categoryId;
        Name = name;
        SKU = sku;
        Unit = unit;
        QuantityInStock = quantityInStock;
        ReorderLevel = reorderLevel;
        UnitPrice = unitPrice;
        Description = description;
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
    }

    public InventoryItem() { }
}
