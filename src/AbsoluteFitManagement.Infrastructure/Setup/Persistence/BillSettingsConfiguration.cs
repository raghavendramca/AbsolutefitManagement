using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BillSettingsEntity = AbsoluteFitManagement.Domain.Setup.BillSettings;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class BillSettingsConfiguration : IEntityTypeConfiguration<BillSettingsEntity>
{
    public void Configure(EntityTypeBuilder<BillSettingsEntity> builder)
    {
        builder.ToTable("BillSettings");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.SettingKey).HasMaxLength(100);
        builder.Property(x => x.SettingsJson).HasMaxLength(4000);
        builder.HasIndex(x => new { x.GymId, x.SettingKey }).IsUnique();
    }
}
