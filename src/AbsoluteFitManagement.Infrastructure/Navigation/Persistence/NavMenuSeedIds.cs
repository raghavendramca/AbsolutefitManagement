namespace AbsoluteFitManagement.Infrastructure.Navigation.Persistence;

/// <summary>
/// Fixed GUIDs for nav-menu seed data — never change after first deployment.
/// </summary>
internal static class NavMenuSeedIds
{
    // ── NavMenuItems ─────────────────────────────────────────────────────────
    internal static readonly Guid Dashboard  = new("1a000001-0000-0000-0000-000000000000");
    internal static readonly Guid Enquiries  = new("1a000002-0000-0000-0000-000000000000");
    internal static readonly Guid Marketing  = new("1a000003-0000-0000-0000-000000000000");
    internal static readonly Guid Clients    = new("1a000004-0000-0000-0000-000000000000");
    internal static readonly Guid Training   = new("1a000005-0000-0000-0000-000000000000");
    internal static readonly Guid Staff      = new("1a000006-0000-0000-0000-000000000000");
    internal static readonly Guid Reports    = new("1a000007-0000-0000-0000-000000000000");
    internal static readonly Guid Setup      = new("1a000008-0000-0000-0000-000000000000");
    internal static readonly Guid Corporates = new("1a000009-0000-0000-0000-000000000000");

    // ── NavFlyouts ───────────────────────────────────────────────────────────
    internal static readonly Guid ClientsFlyout    = new("1b000001-0000-0000-0000-000000000000");
    internal static readonly Guid MarketingFlyout  = new("1b000002-0000-0000-0000-000000000000");
    internal static readonly Guid TrainingFlyout   = new("1b000003-0000-0000-0000-000000000000");

    // ── NavSections (Clients flyout) ─────────────────────────────────────────
    internal static readonly Guid SecValidityBased     = new("1c000001-0000-0000-0000-000000000000");
    internal static readonly Guid SecPurchaseTypeBased = new("1c000002-0000-0000-0000-000000000000");
    internal static readonly Guid SecServiceCategory   = new("1c000003-0000-0000-0000-000000000000");
    internal static readonly Guid SecBehaviourBased    = new("1c000004-0000-0000-0000-000000000000");
    internal static readonly Guid SecGenderBased       = new("1c000005-0000-0000-0000-000000000000");
    internal static readonly Guid SecMultiClubBased    = new("1c000006-0000-0000-0000-000000000000");
    internal static readonly Guid SecCustomGroups      = new("1c000007-0000-0000-0000-000000000000");
    internal static readonly Guid SecArchived          = new("1c000008-0000-0000-0000-000000000000");

    // ── NavSections (Marketing flyout) ───────────────────────────────────────
    internal static readonly Guid SecCommunication = new("1c000009-0000-0000-0000-000000000000");
    internal static readonly Guid SecEngagement    = new("1c000010-0000-0000-0000-000000000000");
    internal static readonly Guid SecData          = new("1c000011-0000-0000-0000-000000000000");

    // ── NavSections (Training flyout) ────────────────────────────────────────
    internal static readonly Guid SecTraining = new("1c000012-0000-0000-0000-000000000000");

    // ── NavSectionItems — Validity Based ─────────────────────────────────────
    internal static readonly Guid ItemAllClients_V      = new("1d000001-0000-0000-0000-000000000000");
    internal static readonly Guid ItemActiveClients_V   = new("1d000002-0000-0000-0000-000000000000");
    internal static readonly Guid ItemInactiveClients_V = new("1d000003-0000-0000-0000-000000000000");

    // ── NavSectionItems — Purchase Type Based ────────────────────────────────
    internal static readonly Guid ItemMemberships    = new("1d000004-0000-0000-0000-000000000000");
    internal static readonly Guid ItemSingleSessions = new("1d000005-0000-0000-0000-000000000000");
    internal static readonly Guid ItemEvents         = new("1d000006-0000-0000-0000-000000000000");
    internal static readonly Guid ItemTurfs          = new("1d000007-0000-0000-0000-000000000000");
    internal static readonly Guid ItemStore          = new("1d000008-0000-0000-0000-000000000000");

    // ── NavSectionItems — Service Category ───────────────────────────────────
    internal static readonly Guid ItemGeneralMembership    = new("1d000009-0000-0000-0000-000000000000");
    internal static readonly Guid ItemPersonalTraining     = new("1d000010-0000-0000-0000-000000000000");
    internal static readonly Guid ItemGroupTraining        = new("1d000011-0000-0000-0000-000000000000");
    internal static readonly Guid ItemNutritionCounselling = new("1d000012-0000-0000-0000-000000000000");
    internal static readonly Guid ItemTeachersTraining     = new("1d000013-0000-0000-0000-000000000000");
    internal static readonly Guid ItemWorkshopsEvents      = new("1d000014-0000-0000-0000-000000000000");
    internal static readonly Guid ItemTrial                = new("1d000015-0000-0000-0000-000000000000");
    internal static readonly Guid ItemPTTrial              = new("1d000016-0000-0000-0000-000000000000");

    // ── NavSectionItems — Behaviour Based ────────────────────────────────────
    internal static readonly Guid ItemReferrers         = new("1d000017-0000-0000-0000-000000000000");
    internal static readonly Guid ItemIrregularMember   = new("1d000018-0000-0000-0000-000000000000");
    internal static readonly Guid ItemOneTimePurchasers = new("1d000019-0000-0000-0000-000000000000");

    // ── NavSectionItems — Gender Based ───────────────────────────────────────
    internal static readonly Guid ItemMale         = new("1d000020-0000-0000-0000-000000000000");
    internal static readonly Guid ItemFemale       = new("1d000021-0000-0000-0000-000000000000");
    internal static readonly Guid ItemNotSpecified = new("1d000022-0000-0000-0000-000000000000");
    internal static readonly Guid ItemAgeGroup     = new("1d000023-0000-0000-0000-000000000000");

    // ── NavSectionItems — Multi-Club Based ───────────────────────────────────
    internal static readonly Guid ItemActiveClients_MC  = new("1d000024-0000-0000-0000-000000000000");
    internal static readonly Guid ItemInactiveClients_MC = new("1d000025-0000-0000-0000-000000000000");

    // ── NavSectionItems — Custom Groups ──────────────────────────────────────
    internal static readonly Guid ItemBatches = new("1d000026-0000-0000-0000-000000000000");

    // ── NavSectionItems — Archived ───────────────────────────────────────────
    internal static readonly Guid ItemArchivedClients = new("1d000027-0000-0000-0000-000000000000");

    // ── NavSectionItems — Marketing: Communication ───────────────────────────
    internal static readonly Guid ItemEmail            = new("1d000028-0000-0000-0000-000000000000");
    internal static readonly Guid ItemSMS              = new("1d000029-0000-0000-0000-000000000000");
    internal static readonly Guid ItemWhatsApp         = new("1d000030-0000-0000-0000-000000000000");
    internal static readonly Guid ItemPushNotification = new("1d000031-0000-0000-0000-000000000000");

    // ── NavSectionItems — Marketing: Engagement ──────────────────────────────
    internal static readonly Guid ItemOffers       = new("1d000032-0000-0000-0000-000000000000");
    internal static readonly Guid ItemDiscountCode = new("1d000033-0000-0000-0000-000000000000");

    // ── NavSectionItems — Marketing: Data ────────────────────────────────────
    internal static readonly Guid ItemUnqualifiedData  = new("1d000034-0000-0000-0000-000000000000");
    internal static readonly Guid ItemCustomMailerList = new("1d000035-0000-0000-0000-000000000000");

    // ── NavSectionItems — Training ────────────────────────────────────────────
    internal static readonly Guid ItemPTDashboard         = new("1d000036-0000-0000-0000-000000000000");
    internal static readonly Guid ItemExerciseLibrary     = new("1d000037-0000-0000-0000-000000000000");
    internal static readonly Guid ItemMealPlanTemplates   = new("1d000038-0000-0000-0000-000000000000");
    internal static readonly Guid ItemAssessmentTemplates = new("1d000039-0000-0000-0000-000000000000");

    // ── NavFlyouts (Setup) ───────────────────────────────────────────────────
    internal static readonly Guid SetupFlyout = new("1b000004-0000-0000-0000-000000000000");

    // ── NavSections (Setup flyout) ───────────────────────────────────────────
    internal static readonly Guid SecSetupGeneral          = new("1c000013-0000-0000-0000-000000000000");
    internal static readonly Guid SecSetupMarketing        = new("1c000014-0000-0000-0000-000000000000");
    internal static readonly Guid SecSetupClientMgmt       = new("1c000015-0000-0000-0000-000000000000");
    internal static readonly Guid SecSetupTraining         = new("1c000016-0000-0000-0000-000000000000");
    internal static readonly Guid SecSetupStaffMgmt        = new("1c000017-0000-0000-0000-000000000000");
    internal static readonly Guid SecSetupInventory        = new("1c000018-0000-0000-0000-000000000000");
    internal static readonly Guid SecSetupExpense          = new("1c000019-0000-0000-0000-000000000000");
    internal static readonly Guid SecSetupIntegrations     = new("1c000020-0000-0000-0000-000000000000");

    // ── NavSectionItems — Setup: General ─────────────────────────────────────
    internal static readonly Guid SetupGettingStarted      = new("1d000040-0000-0000-0000-000000000000");
    internal static readonly Guid SetupProfile             = new("1d000041-0000-0000-0000-000000000000");
    internal static readonly Guid SetupManageServices      = new("1d000042-0000-0000-0000-000000000000");
    internal static readonly Guid SetupManagePackages      = new("1d000043-0000-0000-0000-000000000000");
    internal static readonly Guid SetupFormCustomization   = new("1d000044-0000-0000-0000-000000000000");
    internal static readonly Guid SetupBillTemplate        = new("1d000045-0000-0000-0000-000000000000");
    internal static readonly Guid SetupDefineTax           = new("1d000046-0000-0000-0000-000000000000");
    internal static readonly Guid SetupCheckinNotification = new("1d000047-0000-0000-0000-000000000000");
    internal static readonly Guid SetupClubAgreement       = new("1d000048-0000-0000-0000-000000000000");
    internal static readonly Guid SetupTaskSetup           = new("1d000049-0000-0000-0000-000000000000");
    internal static readonly Guid SetupTrial               = new("1d000050-0000-0000-0000-000000000000");
    internal static readonly Guid SetupServiceResource     = new("1d000051-0000-0000-0000-000000000000");
    internal static readonly Guid SetupIdCard              = new("1d000052-0000-0000-0000-000000000000");
    internal static readonly Guid SetupBulkDataDeletion    = new("1d000053-0000-0000-0000-000000000000");
    internal static readonly Guid SetupReportFormat        = new("1d000054-0000-0000-0000-000000000000");
    internal static readonly Guid SetupHelp                = new("1d000055-0000-0000-0000-000000000000");
    internal static readonly Guid SetupImportEnquiry       = new("1d000056-0000-0000-0000-000000000000");

    // ── NavSectionItems — Setup: Marketing ───────────────────────────────────
    internal static readonly Guid SetupEmailTemplates      = new("1d000057-0000-0000-0000-000000000000");
    internal static readonly Guid SetupSmsTemplates        = new("1d000058-0000-0000-0000-000000000000");
    internal static readonly Guid SetupWhatsAppTemplates   = new("1d000059-0000-0000-0000-000000000000");

    // ── NavSectionItems — Setup: Client Management ───────────────────────────
    internal static readonly Guid SetupMembershipPlans     = new("1d000060-0000-0000-0000-000000000000");
    internal static readonly Guid SetupPackages            = new("1d000061-0000-0000-0000-000000000000");
    internal static readonly Guid SetupAddOns              = new("1d000062-0000-0000-0000-000000000000");

    // ── NavSectionItems — Setup: Training ────────────────────────────────────
    internal static readonly Guid SetupTrainerProfiles     = new("1d000063-0000-0000-0000-000000000000");
    internal static readonly Guid SetupClassTypes          = new("1d000064-0000-0000-0000-000000000000");
    internal static readonly Guid SetupSchedules           = new("1d000065-0000-0000-0000-000000000000");

    // ── NavSectionItems — Setup: Staff Management ────────────────────────────
    internal static readonly Guid SetupRolesPermissions    = new("1d000066-0000-0000-0000-000000000000");
    internal static readonly Guid SetupAttendanceSettings  = new("1d000067-0000-0000-0000-000000000000");
    internal static readonly Guid SetupTargets             = new("1d000068-0000-0000-0000-000000000000");

    // ── NavSectionItems — Setup: Inventory ───────────────────────────────────
    internal static readonly Guid SetupInventoryCategories = new("1d000069-0000-0000-0000-000000000000");
    internal static readonly Guid SetupProducts            = new("1d000070-0000-0000-0000-000000000000");
    internal static readonly Guid SetupSuppliers           = new("1d000071-0000-0000-0000-000000000000");

    // ── NavSectionItems — Setup: Expense ─────────────────────────────────────
    internal static readonly Guid SetupExpenseCategories   = new("1d000072-0000-0000-0000-000000000000");
    internal static readonly Guid SetupVendors             = new("1d000073-0000-0000-0000-000000000000");
    internal static readonly Guid SetupRecurringExpenses   = new("1d000074-0000-0000-0000-000000000000");

    // ── NavSectionItems — Setup: Integrations ────────────────────────────────
    internal static readonly Guid SetupPaymentGateway      = new("1d000075-0000-0000-0000-000000000000");
    internal static readonly Guid SetupSmsGateway          = new("1d000076-0000-0000-0000-000000000000");
    internal static readonly Guid SetupEmailGateway        = new("1d000077-0000-0000-0000-000000000000");
}
