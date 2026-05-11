using AbsoluteFitManagement.Domain.Finance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Finance.Persistence;

public class InvoiceItemConfiguration : IEntityTypeConfiguration<InvoiceItem>
{
    public void Configure(EntityTypeBuilder<InvoiceItem> builder)
    {
        builder.ToTable("InvoiceItems");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.InvoiceId);
        builder.Property(x => x.Description).HasMaxLength(300);
        builder.Property(x => x.UnitPrice).HasPrecision(12, 2);
        builder.Property(x => x.TaxRate).HasPrecision(5, 2);
        builder.Property(x => x.Amount).HasPrecision(12, 2);
        builder.Property(x => x.Discount).HasPrecision(12, 2);
        builder.Property(x => x.DiscountType).HasMaxLength(10).HasDefaultValue("%");
        builder.Property(x => x.StartDate).HasMaxLength(30);
        builder.Property(x => x.ExpiryDate).HasMaxLength(30);
        builder.Property(x => x.SacCode).HasMaxLength(50);
        builder.Property(x => x.Duration).HasMaxLength(300);
        builder.HasIndex(x => x.InvoiceId);
    }
}
