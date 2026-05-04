using System.Reflection;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Admins;
using AbsoluteFitManagement.Domain.Common;
using AbsoluteFitManagement.Domain.Corporates;
using AbsoluteFitManagement.Domain.Enquiries;
using AbsoluteFitManagement.Domain.Finance;
using AbsoluteFitManagement.Domain.Gyms;
using AbsoluteFitManagement.Domain.Inventory;
using AbsoluteFitManagement.Domain.Marketing;
using AbsoluteFitManagement.Domain.Members;
using AbsoluteFitManagement.Domain.Navigation;
using AbsoluteFitManagement.Domain.Packages;
using AbsoluteFitManagement.Domain.Services;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Domain.Staff;
using AbsoluteFitManagement.Domain.Subscriptions;
using AbsoluteFitManagement.Domain.Support;
using AbsoluteFitManagement.Domain.Training;
using AbsoluteFitManagement.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Common.Persistence;

public class AbsoluteFitManagementDbContext : DbContext, IUnitOfWork
{
    // Core
    public DbSet<Admin> Admins { get; set; } = null!;
    public DbSet<Subscription> Subscriptions { get; set; } = null!;
    public DbSet<Gym> Gyms { get; set; } = null!;
    public DbSet<LoginOption> LoginOptions { get; set; } = null!;
    public DbSet<StudioUser> StudioUsers { get; set; } = null!;

    // Navigation menu
    public DbSet<NavMenuItem> NavMenuItems { get; set; } = null!;
    public DbSet<NavFlyout> NavFlyouts { get; set; } = null!;
    public DbSet<NavSection> NavSections { get; set; } = null!;
    public DbSet<NavSectionItem> NavSectionItems { get; set; } = null!;
    public DbSet<QuickAddMenuItem> QuickAddMenuItems { get; set; } = null!;

    // Enquiry pipeline
    public DbSet<Enquiry> Enquiries { get; set; } = null!;

    // Clients / Members
    public DbSet<Member> Members { get; set; } = null!;
    public DbSet<MembershipPlan> MembershipPlans { get; set; } = null!;
    public DbSet<Membership> Memberships { get; set; } = null!;

    // Staff
    public DbSet<StaffMember> Staff { get; set; } = null!;
    public DbSet<StaffTarget> StaffTargets { get; set; } = null!;

    // Setup
    public DbSet<GymService> GymServices { get; set; } = null!;
    public DbSet<ServiceVariation> ServiceVariations { get; set; } = null!;
    public DbSet<GymPackage> GymPackages { get; set; } = null!;
    public DbSet<GymPackageItem> GymPackageItems { get; set; } = null!;
    public DbSet<GymProfile> GymProfiles { get; set; } = null!;
    public DbSet<FormCustomization> FormCustomizations { get; set; } = null!;
    public DbSet<FitnessProfileItem> FitnessProfileItems { get; set; } = null!;
    public DbSet<ApparelItem> ApparelItems { get; set; } = null!;
    public DbSet<BillTemplate> BillTemplates { get; set; } = null!;
    public DbSet<BillSettings> BillSettings { get; set; } = null!;

    // Finance
    public DbSet<Invoice> Invoices { get; set; } = null!;
    public DbSet<InvoiceItem> InvoiceItems { get; set; } = null!;
    public DbSet<Expense> Expenses { get; set; } = null!;
    public DbSet<ExpenseCategory> ExpenseCategories { get; set; } = null!;
    public DbSet<Estimate> Estimates { get; set; } = null!;
    public DbSet<EstimateItem> EstimateItems { get; set; } = null!;

    // Inventory
    public DbSet<InventoryCategory> InventoryCategories { get; set; } = null!;
    public DbSet<InventoryItem> InventoryItems { get; set; } = null!;

    // Support
    public DbSet<SupportRequest> SupportRequests { get; set; } = null!;

    // Corporates
    public DbSet<Corporate> Corporates { get; set; } = null!;
    public DbSet<CorporateMember> CorporateMembers { get; set; } = null!;

    // Training
    public DbSet<TrainingClass> TrainingClasses { get; set; } = null!;
    public DbSet<TrainingSession> TrainingSessions { get; set; } = null!;
    public DbSet<SessionBooking> SessionBookings { get; set; } = null!;

    // Marketing
    public DbSet<MarketingCampaign> MarketingCampaigns { get; set; } = null!;
    public DbSet<CommunicationLog> CommunicationLogs { get; set; } = null!;

    public AbsoluteFitManagementDbContext(DbContextOptions options) : base(options) { }

    public async Task CommitChangesAsync() => await SaveChangesAsync();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // TPC: every concrete entity owns all its columns in its own flat table.
        // Abstract base classes (Entity, AuditableEntity, GymScopedEntity, PersonEntity)
        // are not mapped to any table; each concrete type carries all inherited properties.
        modelBuilder.Entity<Entity>().UseTpcMappingStrategy();
        modelBuilder.Entity<Entity>().HasKey(x => x.Id);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}
