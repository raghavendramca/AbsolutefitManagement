using AbsoluteFitManagement.Domain.Finance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Finance.Persistence;

public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
{
    public void Configure(EntityTypeBuilder<Invoice> builder)
    {
        builder.ToTable("Invoices");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.MemberId);
        builder.Property(x => x.InvoiceNumber).HasMaxLength(50);
        builder.Property(x => x.SubTotal).HasPrecision(12, 2);
        builder.Property(x => x.TaxAmount).HasPrecision(12, 2);
        builder.Property(x => x.TotalAmount).HasPrecision(12, 2);
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Draft");
        builder.Property(x => x.Notes).HasMaxLength(500);
        builder.HasIndex(x => x.GymId);
        builder.HasIndex(x => x.InvoiceNumber);
    }
}
