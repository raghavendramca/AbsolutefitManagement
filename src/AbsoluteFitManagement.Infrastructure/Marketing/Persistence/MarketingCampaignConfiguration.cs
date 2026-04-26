using AbsoluteFitManagement.Domain.Marketing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Marketing.Persistence;

public class MarketingCampaignConfiguration : IEntityTypeConfiguration<MarketingCampaign>
{
    public void Configure(EntityTypeBuilder<MarketingCampaign> builder)
    {
        builder.ToTable("MarketingCampaigns");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.Name).HasMaxLength(200);
        builder.Property(x => x.Channel).HasMaxLength(20);
        builder.Property(x => x.Subject).HasMaxLength(300);
        builder.Property(x => x.Content).HasMaxLength(4000);
        builder.Property(x => x.TargetAudience).HasMaxLength(50).HasDefaultValue("All");
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Draft");
        builder.HasIndex(x => x.GymId);
    }
}
