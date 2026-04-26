using AbsoluteFitManagement.Domain.Members;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Members.Persistence;

public class MembershipConfiguration : IEntityTypeConfiguration<Membership>
{
    public void Configure(EntityTypeBuilder<Membership> builder)
    {
        builder.ToTable("Memberships");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.MemberId);
        builder.Property(x => x.PlanId);
        builder.Property(x => x.AmountPaid).HasPrecision(12, 2);
        builder.Property(x => x.PaymentStatus).HasMaxLength(20).HasDefaultValue("Pending");
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Active");
        builder.Property(x => x.Notes).HasMaxLength(500);
        builder.HasIndex(x => x.MemberId);
        builder.HasIndex(x => x.GymId);
    }
}
