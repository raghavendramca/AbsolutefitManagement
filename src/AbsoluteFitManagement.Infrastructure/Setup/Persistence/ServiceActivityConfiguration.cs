using AbsoluteFitManagement.Domain.Setup;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class ServiceActivityConfiguration : IEntityTypeConfiguration<ServiceActivity>
{
    public void Configure(EntityTypeBuilder<ServiceActivity> builder)
    {
        builder.ToTable("ServiceActivities");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.CategoryId).IsRequired();
        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.SortOrder);
        builder.Property(x => x.IsActive).HasDefaultValue(true);
        builder.HasIndex(x => new { x.CategoryId, x.Name }).IsUnique();
    }
}
