using AbsoluteFitManagement.Domain.Setup;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class ApparelItemConfiguration : IEntityTypeConfiguration<ApparelItem>
{
    public void Configure(EntityTypeBuilder<ApparelItem> builder)
    {
        builder.ToTable("ApparelItems");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Category).HasMaxLength(50);
        builder.Property(x => x.Name).HasMaxLength(200);
        builder.HasIndex(x => new { x.GymId, x.Category, x.SortOrder });
    }
}
