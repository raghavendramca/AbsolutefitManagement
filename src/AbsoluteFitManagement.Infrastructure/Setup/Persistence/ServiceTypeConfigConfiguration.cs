using AbsoluteFitManagement.Domain.Setup;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class ServiceTypeConfigConfiguration : IEntityTypeConfiguration<ServiceTypeConfig>
{
    public void Configure(EntityTypeBuilder<ServiceTypeConfig> builder)
    {
        builder.ToTable("ServiceTypeConfigs");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Name).HasMaxLength(100);
        builder.HasIndex(x => x.Name).IsUnique();
    }
}
