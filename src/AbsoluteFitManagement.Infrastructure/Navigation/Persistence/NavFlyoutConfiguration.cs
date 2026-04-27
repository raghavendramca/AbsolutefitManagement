using AbsoluteFitManagement.Domain.Navigation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Navigation.Persistence;

public class NavFlyoutConfiguration : IEntityTypeConfiguration<NavFlyout>
{
    public void Configure(EntityTypeBuilder<NavFlyout> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Title).IsRequired().HasMaxLength(100);

        builder.HasMany(x => x.Sections)
               .WithOne()
               .HasForeignKey(s => s.NavFlyoutId);

        builder.HasData(
            new NavFlyout(NavMenuSeedIds.ClientsFlyout,   NavMenuSeedIds.Clients,   "Client Segments"),
            new NavFlyout(NavMenuSeedIds.MarketingFlyout, NavMenuSeedIds.Marketing, "Marketing"),
            new NavFlyout(NavMenuSeedIds.TrainingFlyout,  NavMenuSeedIds.Training,  "Training"),
            new NavFlyout(NavMenuSeedIds.SetupFlyout,     NavMenuSeedIds.Setup,     "Setup")
        );
    }
}
