using AbsoluteFitManagement.Domain.Staff;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Staff.Persistence;

public class StaffTargetConfiguration : IEntityTypeConfiguration<StaffTarget>
{
    public void Configure(EntityTypeBuilder<StaffTarget> builder)
    {
        builder.ToTable("StaffTargets");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.StaffId);
        builder.Property(x => x.TargetCategory).HasMaxLength(100);
        builder.Property(x => x.TargetType).HasMaxLength(100);
        builder.Property(x => x.Year);
        builder.Property(x => x.MonthlyValuesJson).HasColumnType("TEXT");
        builder.Property(x => x.CreatedAt);
        builder.HasIndex(x => x.GymId);
        builder.HasIndex(x => x.StaffId);
    }
}
