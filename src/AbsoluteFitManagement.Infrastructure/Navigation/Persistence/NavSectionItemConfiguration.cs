using AbsoluteFitManagement.Domain.Navigation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Navigation.Persistence;

public class NavSectionItemConfiguration : IEntityTypeConfiguration<NavSectionItem>
{
    public void Configure(EntityTypeBuilder<NavSectionItem> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Label).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Route).HasMaxLength(200);

        // ── Validity Based ────────────────────────────────────────────────────
        var vb = NavMenuSeedIds.SecValidityBased;
        // ── Purchase Type Based ───────────────────────────────────────────────
        var pt = NavMenuSeedIds.SecPurchaseTypeBased;
        // ── Service Category ─────────────────────────────────────────────────
        var sc = NavMenuSeedIds.SecServiceCategory;
        // ── Behaviour Based ───────────────────────────────────────────────────
        var bb = NavMenuSeedIds.SecBehaviourBased;
        // ── Gender Based ──────────────────────────────────────────────────────
        var gb = NavMenuSeedIds.SecGenderBased;
        // ── Multi-Club Based ──────────────────────────────────────────────────
        var mc = NavMenuSeedIds.SecMultiClubBased;
        // ── Custom Groups ─────────────────────────────────────────────────────
        var cg = NavMenuSeedIds.SecCustomGroups;
        // ── Archived ──────────────────────────────────────────────────────────
        var ar = NavMenuSeedIds.SecArchived;

        builder.HasData(
            // Validity Based
            new NavSectionItem(NavMenuSeedIds.ItemAllClients_V,      vb, "All Clients",      1),
            new NavSectionItem(NavMenuSeedIds.ItemActiveClients_V,   vb, "Active Clients",   2),
            new NavSectionItem(NavMenuSeedIds.ItemInactiveClients_V, vb, "Inactive Clients", 3),

            // Purchase Type Based
            new NavSectionItem(NavMenuSeedIds.ItemMemberships,    pt, "Memberships",              1),
            new NavSectionItem(NavMenuSeedIds.ItemSingleSessions, pt, "Single Sessions/1 Day Pass", 2),
            new NavSectionItem(NavMenuSeedIds.ItemEvents,         pt, "Events",                   3),
            new NavSectionItem(NavMenuSeedIds.ItemTurfs,          pt, "Turfs",                    4),
            new NavSectionItem(NavMenuSeedIds.ItemStore,          pt, "Store",                    5),

            // Service Category
            new NavSectionItem(NavMenuSeedIds.ItemGeneralMembership,    sc, "General Membership",    1),
            new NavSectionItem(NavMenuSeedIds.ItemPersonalTraining,     sc, "Personal Training",     2),
            new NavSectionItem(NavMenuSeedIds.ItemGroupTraining,        sc, "Group Training",        3),
            new NavSectionItem(NavMenuSeedIds.ItemNutritionCounselling, sc, "Nutrition Counselling", 4),
            new NavSectionItem(NavMenuSeedIds.ItemTeachersTraining,     sc, "Teachers Training",     5),
            new NavSectionItem(NavMenuSeedIds.ItemWorkshopsEvents,      sc, "Workshops/Events",      6),
            new NavSectionItem(NavMenuSeedIds.ItemTrial,                sc, "Trial",                7),
            new NavSectionItem(NavMenuSeedIds.ItemPTTrial,              sc, "PT Trial",             8),

            // Behaviour Based
            new NavSectionItem(NavMenuSeedIds.ItemReferrers,         bb, "Referrers",          1),
            new NavSectionItem(NavMenuSeedIds.ItemIrregularMember,   bb, "Irregular Member",   2),
            new NavSectionItem(NavMenuSeedIds.ItemOneTimePurchasers, bb, "One-Time Purchasers", 3),

            // Gender Based
            new NavSectionItem(NavMenuSeedIds.ItemMale,         gb, "Male",          1),
            new NavSectionItem(NavMenuSeedIds.ItemFemale,       gb, "Female",        2),
            new NavSectionItem(NavMenuSeedIds.ItemNotSpecified, gb, "Not Specified", 3),
            new NavSectionItem(NavMenuSeedIds.ItemAgeGroup,     gb, "Age Group",     4),

            // Multi-Club Based
            new NavSectionItem(NavMenuSeedIds.ItemActiveClients_MC,   mc, "Active Clients",   1),
            new NavSectionItem(NavMenuSeedIds.ItemInactiveClients_MC, mc, "Inactive Clients", 2),

            // Custom Groups
            new NavSectionItem(NavMenuSeedIds.ItemBatches, cg, "Batches", 1),

            // Archived
            new NavSectionItem(NavMenuSeedIds.ItemArchivedClients, ar, "Archived Clients", 1),

            // Marketing — Communication
            new NavSectionItem(NavMenuSeedIds.ItemEmail,            NavMenuSeedIds.SecCommunication, "E-Mail",            1),
            new NavSectionItem(NavMenuSeedIds.ItemSMS,              NavMenuSeedIds.SecCommunication, "SMS",               2),
            new NavSectionItem(NavMenuSeedIds.ItemWhatsApp,         NavMenuSeedIds.SecCommunication, "WhatsApp",          3),
            new NavSectionItem(NavMenuSeedIds.ItemPushNotification, NavMenuSeedIds.SecCommunication, "Push Notification", 4),

            // Marketing — Engagement
            new NavSectionItem(NavMenuSeedIds.ItemOffers,       NavMenuSeedIds.SecEngagement, "Offers",        1),
            new NavSectionItem(NavMenuSeedIds.ItemDiscountCode, NavMenuSeedIds.SecEngagement, "Discount Code", 2),

            // Marketing — Data
            new NavSectionItem(NavMenuSeedIds.ItemUnqualifiedData,  NavMenuSeedIds.SecData, "Unqualified Data",  1),
            new NavSectionItem(NavMenuSeedIds.ItemCustomMailerList, NavMenuSeedIds.SecData, "Custom Mailer List", 2),

            // Training
            new NavSectionItem(NavMenuSeedIds.ItemPTDashboard,         NavMenuSeedIds.SecTraining, "PT Dashboard",         1),
            new NavSectionItem(NavMenuSeedIds.ItemExerciseLibrary,     NavMenuSeedIds.SecTraining, "Exercise Library",     2),
            new NavSectionItem(NavMenuSeedIds.ItemMealPlanTemplates,   NavMenuSeedIds.SecTraining, "Meal Plan Templates",  3),
            new NavSectionItem(NavMenuSeedIds.ItemAssessmentTemplates, NavMenuSeedIds.SecTraining, "Assessment Templates", 4),

            // Setup — General
            new NavSectionItem(NavMenuSeedIds.SetupGettingStarted,      NavMenuSeedIds.SecSetupGeneral, "Getting Started",       1),
            new NavSectionItem(NavMenuSeedIds.SetupProfile,             NavMenuSeedIds.SecSetupGeneral, "Profile",               2),
            new NavSectionItem(NavMenuSeedIds.SetupManageServices,      NavMenuSeedIds.SecSetupGeneral, "Manage Services",       3),
            new NavSectionItem(NavMenuSeedIds.SetupManagePackages,      NavMenuSeedIds.SecSetupGeneral, "Manage Packages",       4),
            new NavSectionItem(NavMenuSeedIds.SetupFormCustomization,   NavMenuSeedIds.SecSetupGeneral, "Form Customization",    5),
            new NavSectionItem(NavMenuSeedIds.SetupBillTemplate,        NavMenuSeedIds.SecSetupGeneral, "Bill Template",         6),
            new NavSectionItem(NavMenuSeedIds.SetupDefineTax,           NavMenuSeedIds.SecSetupGeneral, "Define Tax",            7),
            new NavSectionItem(NavMenuSeedIds.SetupCheckinNotification, NavMenuSeedIds.SecSetupGeneral, "Checkin Notification",  8),
            new NavSectionItem(NavMenuSeedIds.SetupClubAgreement,       NavMenuSeedIds.SecSetupGeneral, "Club Agreement",        9),
            new NavSectionItem(NavMenuSeedIds.SetupTaskSetup,           NavMenuSeedIds.SecSetupGeneral, "Task Setup",            10),
            new NavSectionItem(NavMenuSeedIds.SetupTrial,               NavMenuSeedIds.SecSetupGeneral, "Trial",                 11),
            new NavSectionItem(NavMenuSeedIds.SetupServiceResource,     NavMenuSeedIds.SecSetupGeneral, "Service Resource",      12),
            new NavSectionItem(NavMenuSeedIds.SetupIdCard,              NavMenuSeedIds.SecSetupGeneral, "ID Card",               13),
            new NavSectionItem(NavMenuSeedIds.SetupBulkDataDeletion,    NavMenuSeedIds.SecSetupGeneral, "Bulk Data Deletion",    14),
            new NavSectionItem(NavMenuSeedIds.SetupReportFormat,        NavMenuSeedIds.SecSetupGeneral, "Report Format",         15),
            new NavSectionItem(NavMenuSeedIds.SetupHelp,                NavMenuSeedIds.SecSetupGeneral, "Help",                  16),
            new NavSectionItem(NavMenuSeedIds.SetupImportEnquiry,       NavMenuSeedIds.SecSetupGeneral, "Import Enquiry",        17),

            // Setup — Marketing
            new NavSectionItem(NavMenuSeedIds.SetupEmailTemplates,    NavMenuSeedIds.SecSetupMarketing, "Email Templates",    1),
            new NavSectionItem(NavMenuSeedIds.SetupSmsTemplates,      NavMenuSeedIds.SecSetupMarketing, "SMS Templates",      2),
            new NavSectionItem(NavMenuSeedIds.SetupWhatsAppTemplates, NavMenuSeedIds.SecSetupMarketing, "WhatsApp Templates", 3),

            // Setup — Client Management
            new NavSectionItem(NavMenuSeedIds.SetupMembershipPlans, NavMenuSeedIds.SecSetupClientMgmt, "Membership Plans", 1),
            new NavSectionItem(NavMenuSeedIds.SetupPackages,        NavMenuSeedIds.SecSetupClientMgmt, "Packages",         2),
            new NavSectionItem(NavMenuSeedIds.SetupAddOns,          NavMenuSeedIds.SecSetupClientMgmt, "Add-ons",          3),

            // Setup — Training
            new NavSectionItem(NavMenuSeedIds.SetupTrainerProfiles, NavMenuSeedIds.SecSetupTraining, "Trainer Profiles", 1),
            new NavSectionItem(NavMenuSeedIds.SetupClassTypes,      NavMenuSeedIds.SecSetupTraining, "Class Types",      2),
            new NavSectionItem(NavMenuSeedIds.SetupSchedules,       NavMenuSeedIds.SecSetupTraining, "Schedules",        3),

            // Setup — Staff Management
            new NavSectionItem(NavMenuSeedIds.SetupRolesPermissions,   NavMenuSeedIds.SecSetupStaffMgmt, "Roles & Permissions",   1),
            new NavSectionItem(NavMenuSeedIds.SetupAttendanceSettings, NavMenuSeedIds.SecSetupStaffMgmt, "Attendance Settings",   2),
            new NavSectionItem(NavMenuSeedIds.SetupTargets,            NavMenuSeedIds.SecSetupStaffMgmt, "Targets",               3),

            // Setup — Inventory
            new NavSectionItem(NavMenuSeedIds.SetupInventoryCategories, NavMenuSeedIds.SecSetupInventory, "Categories", 1),
            new NavSectionItem(NavMenuSeedIds.SetupProducts,            NavMenuSeedIds.SecSetupInventory, "Products",   2),
            new NavSectionItem(NavMenuSeedIds.SetupSuppliers,           NavMenuSeedIds.SecSetupInventory, "Suppliers",  3),

            // Setup — Expense
            new NavSectionItem(NavMenuSeedIds.SetupExpenseCategories, NavMenuSeedIds.SecSetupExpense, "Expense Categories",  1),
            new NavSectionItem(NavMenuSeedIds.SetupVendors,           NavMenuSeedIds.SecSetupExpense, "Vendors",             2),
            new NavSectionItem(NavMenuSeedIds.SetupRecurringExpenses, NavMenuSeedIds.SecSetupExpense, "Recurring Expenses",  3),

            // Setup — Integrations
            new NavSectionItem(NavMenuSeedIds.SetupPaymentGateway, NavMenuSeedIds.SecSetupIntegrations, "Payment Gateway", 1),
            new NavSectionItem(NavMenuSeedIds.SetupSmsGateway,     NavMenuSeedIds.SecSetupIntegrations, "SMS Gateway",     2),
            new NavSectionItem(NavMenuSeedIds.SetupEmailGateway,   NavMenuSeedIds.SecSetupIntegrations, "Email Gateway",   3)
        );
    }
}
