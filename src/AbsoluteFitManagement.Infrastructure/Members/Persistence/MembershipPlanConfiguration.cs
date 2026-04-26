using AbsoluteFitManagement.Domain.Members;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Members.Persistence;

public class MembershipPlanConfiguration : IEntityTypeConfiguration<MembershipPlan>
{
    public void Configure(EntityTypeBuilder<MembershipPlan> builder)
    {
        builder.ToTable("MembershipPlans");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.Name).HasMaxLength(200);
        builder.Property(x => x.Description).HasMaxLength(500);
        builder.Property(x => x.Price).HasPrecision(12, 2);
        builder.Property(x => x.IsActive).HasDefaultValue(true);
        builder.HasIndex(x => x.GymId);
    }
}
