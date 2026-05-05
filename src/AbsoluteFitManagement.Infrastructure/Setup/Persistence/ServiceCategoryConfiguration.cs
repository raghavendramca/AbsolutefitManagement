using AbsoluteFitManagement.Domain.Setup;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class ServiceCategoryConfiguration : IEntityTypeConfiguration<ServiceCategory>
{
    public void Configure(EntityTypeBuilder<ServiceCategory> builder)
    {
        builder.ToTable("ServiceCategories");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Name).HasMaxLength(100).IsRequired();
        builder.Property(x => x.SortOrder);
        builder.Property(x => x.IsActive).HasDefaultValue(true);
        builder.HasIndex(x => x.Name).IsUnique();

        builder.HasMany(x => x.Activities)
            .WithOne()
            .HasForeignKey(a => a.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
