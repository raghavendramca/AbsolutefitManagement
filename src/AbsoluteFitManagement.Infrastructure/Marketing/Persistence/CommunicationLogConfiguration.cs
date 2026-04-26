using AbsoluteFitManagement.Domain.Marketing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Marketing.Persistence;

public class CommunicationLogConfiguration : IEntityTypeConfiguration<CommunicationLog>
{
    public void Configure(EntityTypeBuilder<CommunicationLog> builder)
    {
        builder.ToTable("CommunicationLogs");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.CampaignId);
        builder.Property(x => x.RecipientType).HasMaxLength(20);
        builder.Property(x => x.RecipientContact).HasMaxLength(200);
        builder.Property(x => x.Channel).HasMaxLength(20);
        builder.Property(x => x.Message).HasMaxLength(4000);
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Sent");
        builder.HasIndex(x => x.GymId);
        builder.HasIndex(x => x.RecipientId);
    }
}
