using AbsoluteFitManagement.Domain.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Inventory.Persistence;

public class InventoryCategoryConfiguration : IEntityTypeConfiguration<InventoryCategory>
{
    public void Configure(EntityTypeBuilder<InventoryCategory> builder)
    {
        builder.ToTable("InventoryCategories");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.Name).HasMaxLength(100);
        builder.Property(x => x.IsActive).HasDefaultValue(true);
        builder.HasIndex(x => x.GymId);
    }
}
