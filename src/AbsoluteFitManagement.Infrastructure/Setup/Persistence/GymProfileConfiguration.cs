using AbsoluteFitManagement.Domain.Setup;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class GymProfileConfiguration : IEntityTypeConfiguration<GymProfile>
{
    public void Configure(EntityTypeBuilder<GymProfile> builder)
    {
        builder.ToTable("GymProfiles");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Country).HasMaxLength(100).HasDefaultValue("India");
        builder.Property(x => x.StateRegion).HasMaxLength(100);
        builder.Property(x => x.City).HasMaxLength(100);
        builder.Property(x => x.Locality).HasMaxLength(100);
        builder.Property(x => x.Currency).HasMaxLength(10).HasDefaultValue("₹");
        builder.Property(x => x.Region).HasMaxLength(100);
        builder.Property(x => x.Timezone).HasMaxLength(200);
        builder.Property(x => x.BusinessType).HasMaxLength(100);
        builder.Property(x => x.BrandName).HasMaxLength(200);
        builder.Property(x => x.PhoneNumber).HasMaxLength(20);
        builder.Property(x => x.Email).HasMaxLength(200);
        builder.Property(x => x.Address).HasMaxLength(500);
        builder.Property(x => x.OperatingHoursJson).HasColumnType("TEXT");
        builder.HasIndex(x => x.GymId).IsUnique();
    }
}
