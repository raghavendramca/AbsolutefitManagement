using AbsoluteFitManagement.Domain.Finance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Finance.Persistence;

public class ExpenseCategoryConfiguration : IEntityTypeConfiguration<ExpenseCategory>
{
    public void Configure(EntityTypeBuilder<ExpenseCategory> builder)
    {
        builder.ToTable("ExpenseCategories");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.Name).HasMaxLength(100);
        builder.Property(x => x.IsActive).HasDefaultValue(true);
        builder.HasIndex(x => x.GymId);
    }
}
