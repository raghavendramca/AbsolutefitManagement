using AbsoluteFitManagement.Domain.Finance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Finance.Persistence;

public class ExpenseConfiguration : IEntityTypeConfiguration<Expense>
{
    public void Configure(EntityTypeBuilder<Expense> builder)
    {
        builder.ToTable("Expenses");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.CategoryId);
        builder.Property(x => x.StaffId);
        builder.Property(x => x.Title).HasMaxLength(300);
        builder.Property(x => x.Amount).HasPrecision(12, 2);
        builder.Property(x => x.PaymentMode).HasMaxLength(50);
        builder.Property(x => x.Reference).HasMaxLength(100);
        builder.Property(x => x.Notes).HasMaxLength(500);
        builder.HasIndex(x => x.GymId);
    }
}
