using AbsoluteFitManagement.Domain.Navigation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Navigation.Persistence;

public class NavSectionConfiguration : IEntityTypeConfiguration<NavSection>
{
    public void Configure(EntityTypeBuilder<NavSection> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Label).IsRequired().HasMaxLength(100);

        builder.HasMany(x => x.Items)
               .WithOne()
               .HasForeignKey(i => i.NavSectionId);

        var clientsFlyout   = NavMenuSeedIds.ClientsFlyout;
        var marketingFlyout = NavMenuSeedIds.MarketingFlyout;
        var trainingFlyout  = NavMenuSeedIds.TrainingFlyout;

        builder.HasData(
            // Clients
            new NavSection(NavMenuSeedIds.SecValidityBased,     clientsFlyout,   "Validity Based",     1),
            new NavSection(NavMenuSeedIds.SecPurchaseTypeBased, clientsFlyout,   "Purchase Type Based", 2),
            new NavSection(NavMenuSeedIds.SecServiceCategory,   clientsFlyout,   "Service Category",    3),
            new NavSection(NavMenuSeedIds.SecBehaviourBased,    clientsFlyout,   "Behaviour Based",     4),
            new NavSection(NavMenuSeedIds.SecGenderBased,       clientsFlyout,   "Gender Based",        5),
            new NavSection(NavMenuSeedIds.SecMultiClubBased,    clientsFlyout,   "Multi-Club Based",    6),
            new NavSection(NavMenuSeedIds.SecCustomGroups,      clientsFlyout,   "Custom Groups",       7),
            new NavSection(NavMenuSeedIds.SecArchived,          clientsFlyout,   "Archived",            8),

            // Marketing
            new NavSection(NavMenuSeedIds.SecCommunication, marketingFlyout, "Communication", 1),
            new NavSection(NavMenuSeedIds.SecEngagement,    marketingFlyout, "Engagement",    2),
            new NavSection(NavMenuSeedIds.SecData,          marketingFlyout, "Data",          3),

            // Training
            new NavSection(NavMenuSeedIds.SecTraining, trainingFlyout, "Training", 1),

            // Setup
            new NavSection(NavMenuSeedIds.SecSetupGeneral,      NavMenuSeedIds.SetupFlyout, "General",           1),
            new NavSection(NavMenuSeedIds.SecSetupMarketing,    NavMenuSeedIds.SetupFlyout, "Marketing",         2),
            new NavSection(NavMenuSeedIds.SecSetupClientMgmt,   NavMenuSeedIds.SetupFlyout, "Client Management", 3),
            new NavSection(NavMenuSeedIds.SecSetupTraining,     NavMenuSeedIds.SetupFlyout, "Training",          4),
            new NavSection(NavMenuSeedIds.SecSetupStaffMgmt,    NavMenuSeedIds.SetupFlyout, "Staff Management",  5),
            new NavSection(NavMenuSeedIds.SecSetupInventory,    NavMenuSeedIds.SetupFlyout, "Inventory",         6),
            new NavSection(NavMenuSeedIds.SecSetupExpense,      NavMenuSeedIds.SetupFlyout, "Expense",           7),
            new NavSection(NavMenuSeedIds.SecSetupIntegrations, NavMenuSeedIds.SetupFlyout, "Integrations",      8)
        );
    }
}
