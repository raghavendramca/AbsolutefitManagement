using AbsoluteFitManagement.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Services.Persistence;

public class ServiceVariationConfiguration : IEntityTypeConfiguration<ServiceVariation>
{
    public void Configure(EntityTypeBuilder<ServiceVariation> builder)
    {
        builder.ToTable("ServiceVariations");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.ServiceType).HasMaxLength(100);
        builder.Property(x => x.Name).HasMaxLength(200);
        builder.Property(x => x.Tax).HasMaxLength(100).HasDefaultValue("No Tax");
        builder.Property(x => x.Category).HasMaxLength(100);
        builder.Property(x => x.ServiceFee).HasColumnType("decimal(18,2)");
        builder.Property(x => x.MinFeeLimit).HasColumnType("decimal(18,2)");
        builder.Property(x => x.MaxFeeLimit).HasColumnType("decimal(18,2)");
        builder.HasIndex(x => x.ServiceId);
        builder.HasIndex(x => x.GymId);
    }
}
