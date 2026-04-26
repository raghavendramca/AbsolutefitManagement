using AbsoluteFitManagement.Domain.Navigation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Navigation.Persistence;

public class NavMenuItemConfiguration : IEntityTypeConfiguration<NavMenuItem>
{
    public void Configure(EntityTypeBuilder<NavMenuItem> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Key).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Label).IsRequired().HasMaxLength(100);
        builder.Property(x => x.IconName).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Route).HasMaxLength(200);
        builder.HasIndex(x => x.Key).IsUnique();

        builder.HasOne(x => x.Flyout)
               .WithOne()
               .HasForeignKey<NavFlyout>(f => f.NavMenuItemId);

        builder.HasData(
            new NavMenuItem(NavMenuSeedIds.Dashboard,  "dashboard",  "Dashboard",  "dashboard",  1, false),
            new NavMenuItem(NavMenuSeedIds.Enquiries,  "enquiries",  "Enquiries",  "enquiries",  2, false),
            new NavMenuItem(NavMenuSeedIds.Marketing,  "marketing",  "Marketing",  "marketing",  3, true),
            new NavMenuItem(NavMenuSeedIds.Clients,    "clients",    "Clients",    "clients",    4, true),
            new NavMenuItem(NavMenuSeedIds.Training,   "training",   "Training",   "training",   5, true),
            new NavMenuItem(NavMenuSeedIds.Staff,      "staff",      "Staff",      "staff",      6, false),
            new NavMenuItem(NavMenuSeedIds.Reports,    "reports",    "Reports",    "reports",    7, true),
            new NavMenuItem(NavMenuSeedIds.Setup,      "setup",      "Setup",      "setup",      8, true),
            new NavMenuItem(NavMenuSeedIds.Corporates, "corporates", "Corporates", "corporates", 9, false)
        );
    }
}
