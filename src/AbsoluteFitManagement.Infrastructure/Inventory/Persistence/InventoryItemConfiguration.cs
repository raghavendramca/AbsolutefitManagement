using AbsoluteFitManagement.Domain.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Inventory.Persistence;

public class InventoryItemConfiguration : IEntityTypeConfiguration<InventoryItem>
{
    public void Configure(EntityTypeBuilder<InventoryItem> builder)
    {
        builder.ToTable("InventoryItems");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.CategoryId);
        builder.Property(x => x.Name).HasMaxLength(200);
        builder.Property(x => x.SKU).HasMaxLength(50);
        builder.Property(x => x.Unit).HasMaxLength(20).HasDefaultValue("Pcs");
        builder.Property(x => x.UnitPrice).HasPrecision(12, 2);
        builder.Property(x => x.Description).HasMaxLength(500);
        builder.Property(x => x.IsActive).HasDefaultValue(true);
        builder.HasIndex(x => x.GymId);
    }
}
