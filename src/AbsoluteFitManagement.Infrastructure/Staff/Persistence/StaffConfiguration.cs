using AbsoluteFitManagement.Domain.Staff;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Staff.Persistence;

public class StaffConfiguration : IEntityTypeConfiguration<StaffMember>
{
    public void Configure(EntityTypeBuilder<StaffMember> builder)
    {
        builder.ToTable("Staff");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.StaffCode);
        builder.Property(x => x.FullName).HasMaxLength(200);
        builder.Property(x => x.Email).HasMaxLength(200);
        builder.Property(x => x.CountryCode).HasMaxLength(10);
        builder.Property(x => x.ContactNumber).HasMaxLength(20);
        builder.Property(x => x.Role).HasMaxLength(50);
        builder.Property(x => x.Designation).HasMaxLength(100);
        builder.Property(x => x.AdminRights).HasMaxLength(100);
        builder.Property(x => x.AttendanceId).HasMaxLength(50);
        builder.Property(x => x.Salary).HasPrecision(12, 2);
        builder.Property(x => x.Gender).HasMaxLength(10);
        builder.Property(x => x.Address).HasMaxLength(500);
        builder.Property(x => x.IsActive).HasDefaultValue(true);
        builder.HasIndex(x => x.GymId);
        builder.HasIndex(x => new { x.GymId, x.StaffCode }).IsUnique();
    }
}
