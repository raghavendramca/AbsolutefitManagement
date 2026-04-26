using AbsoluteFitManagement.Domain.Finance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Finance.Persistence;

public class EstimateItemConfiguration : IEntityTypeConfiguration<EstimateItem>
{
    public void Configure(EntityTypeBuilder<EstimateItem> builder)
    {
        builder.ToTable("EstimateItems");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.EstimateId);
        builder.Property(x => x.Description).HasMaxLength(300);
        builder.Property(x => x.UnitPrice).HasPrecision(12, 2);
        builder.Property(x => x.TaxRate).HasPrecision(5, 2);
        builder.Property(x => x.Amount).HasPrecision(12, 2);
        builder.HasIndex(x => x.EstimateId);
    }
}
