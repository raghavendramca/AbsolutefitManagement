using AbsoluteFitManagement.Domain.Navigation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Navigation.Persistence;

public class QuickAddMenuItemConfiguration : IEntityTypeConfiguration<QuickAddMenuItem>
{
    public void Configure(EntityTypeBuilder<QuickAddMenuItem> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Key).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Label).IsRequired().HasMaxLength(100);
        builder.Property(x => x.RequiredRole).HasMaxLength(100);
        builder.HasIndex(x => x.Key).IsUnique();

        // Default items — Staff and Inventory are admin-only; all others visible to any staff
        builder.HasData(
            new QuickAddMenuItem(QuickAddMenuSeedIds.Enquiry,   "enquiry",   "Enquiry",         1, true),
            new QuickAddMenuItem(QuickAddMenuSeedIds.Member,    "member",    "Member",          2, true),
            new QuickAddMenuItem(QuickAddMenuSeedIds.Staff,     "staff",     "Staff",           3, true,  "Admin"),
            new QuickAddMenuItem(QuickAddMenuSeedIds.Inventory, "inventory", "Inventory",       4, true,  "Admin"),
            new QuickAddMenuItem(QuickAddMenuSeedIds.Expense,   "expense",   "Expense",         5, true),
            new QuickAddMenuItem(QuickAddMenuSeedIds.Estimate,  "estimate",  "Estimate",        6, true),
            new QuickAddMenuItem(QuickAddMenuSeedIds.Invoice,   "invoice",   "Invoice",         7, true),
            new QuickAddMenuItem(QuickAddMenuSeedIds.Support,   "support",   "Support request", 8, true)
        );
    }
}
