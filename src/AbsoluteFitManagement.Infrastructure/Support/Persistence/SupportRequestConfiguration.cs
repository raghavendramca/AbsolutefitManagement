using AbsoluteFitManagement.Domain.Support;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Support.Persistence;

public class SupportRequestConfiguration : IEntityTypeConfiguration<SupportRequest>
{
    public void Configure(EntityTypeBuilder<SupportRequest> builder)
    {
        builder.ToTable("SupportRequests");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.MemberId);
        builder.Property(x => x.AssignedToStaffId);
        builder.Property(x => x.Subject).HasMaxLength(300);
        builder.Property(x => x.Description).HasMaxLength(2000);
        builder.Property(x => x.Priority).HasMaxLength(10).HasDefaultValue("Medium");
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Open");
        builder.HasIndex(x => x.GymId);
    }
}
