using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    SubscriptionId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CommunicationLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CampaignId = table.Column<Guid>(type: "TEXT", nullable: true),
                    RecipientType = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    RecipientId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RecipientContact = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Channel = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Message = table.Column<string>(type: "TEXT", maxLength: 4000, nullable: false),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Sent"),
                    SentAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunicationLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CorporateMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CorporateId = table.Column<Guid>(type: "TEXT", nullable: false),
                    MemberId = table.Column<Guid>(type: "TEXT", nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CorporateMembers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Corporates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CompanyName = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    ContactPerson = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Phone = table.Column<string>(type: "TEXT", maxLength: 20, nullable: true),
                    Address = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    ContractStartDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    ContractEndDate = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    MembersAllowed = table.Column<int>(type: "INTEGER", nullable: false),
                    DiscountPercent = table.Column<decimal>(type: "TEXT", precision: 5, scale: 2, nullable: false),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Active"),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Corporates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Enquiries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TrialType = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false),
                    EnquiryDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ServiceName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    LeadSource = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    FollowUpStaffName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    FollowUpDateTime = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CallTag = table.Column<string>(type: "TEXT", maxLength: 10, nullable: true),
                    Message = table.Column<string>(type: "TEXT", maxLength: 250, nullable: true),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Enquiry"),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    CountryCode = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    ContactNumber = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Gender = table.Column<string>(type: "TEXT", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enquiries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstimateItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    EstimateId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    TaxRate = table.Column<decimal>(type: "TEXT", precision: 5, scale: 2, nullable: false),
                    Amount = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstimateItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Estimates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    EnquiryId = table.Column<Guid>(type: "TEXT", nullable: true),
                    MemberId = table.Column<Guid>(type: "TEXT", nullable: true),
                    EstimateNumber = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    EstimateDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    ValidUntil = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    SubTotal = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    TaxAmount = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Draft"),
                    Notes = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estimates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExpenseCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CategoryId = table.Column<Guid>(type: "TEXT", nullable: true),
                    StaffId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Amount = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    ExpenseDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    PaymentMode = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Reference = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gyms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    SubscriptionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TenantId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Locality = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false, defaultValue: ""),
                    City = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false, defaultValue: ""),
                    BranchCode = table.Column<int>(type: "INTEGER", nullable: false, defaultValue: 0),
                    MaxRooms = table.Column<int>(type: "INTEGER", nullable: false),
                    RoomIds = table.Column<string>(type: "TEXT", nullable: false),
                    TrainerIds = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gyms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GymServices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GymServices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InventoryCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InventoryItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CategoryId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    SKU = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Unit = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Pcs"),
                    QuantityInStock = table.Column<int>(type: "INTEGER", nullable: false),
                    ReorderLevel = table.Column<int>(type: "INTEGER", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InvoiceItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    InvoiceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    TaxRate = table.Column<decimal>(type: "TEXT", precision: 5, scale: 2, nullable: false),
                    Amount = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    MemberId = table.Column<Guid>(type: "TEXT", nullable: true),
                    InvoiceNumber = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    InvoiceDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    DueDate = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    SubTotal = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    TaxAmount = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Draft"),
                    Notes = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoginOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Label = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Route = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    DisplayOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoginOptions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MarketingCampaigns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Channel = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Subject = table.Column<string>(type: "TEXT", maxLength: 300, nullable: true),
                    Content = table.Column<string>(type: "TEXT", maxLength: 4000, nullable: false),
                    TargetAudience = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false, defaultValue: "All"),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Draft"),
                    ScheduledAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    SentAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    RecipientCount = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MarketingCampaigns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Members",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    EnquiryId = table.Column<Guid>(type: "TEXT", nullable: true),
                    DateOfBirth = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    EmergencyContactName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    EmergencyContactPhone = table.Column<string>(type: "TEXT", maxLength: 20, nullable: true),
                    PhotoUrl = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    JoinDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Active"),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    CountryCode = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    ContactNumber = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Gender = table.Column<string>(type: "TEXT", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Members", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MembershipPlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    DurationMonths = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    SessionsIncluded = table.Column<int>(type: "INTEGER", nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MembershipPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Memberships",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    MemberId = table.Column<Guid>(type: "TEXT", nullable: false),
                    PlanId = table.Column<Guid>(type: "TEXT", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    AmountPaid = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: false),
                    PaymentStatus = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Pending"),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Active"),
                    Notes = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Memberships", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NavMenuItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Key = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Label = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    IconName = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false),
                    IsExpandable = table.Column<bool>(type: "INTEGER", nullable: false),
                    Route = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NavMenuItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SessionBookings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    SessionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    MemberId = table.Column<Guid>(type: "TEXT", nullable: false),
                    BookingStatus = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Booked"),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionBookings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    StaffCode = table.Column<int>(type: "INTEGER", nullable: false),
                    Role = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Designation = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    AdminRights = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    AttendanceId = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Salary = table.Column<decimal>(type: "TEXT", precision: 12, scale: 2, nullable: true),
                    JoinDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    CountryCode = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    ContactNumber = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Gender = table.Column<string>(type: "TEXT", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudioUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    AdminId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudioUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    SubscriptionType = table.Column<int>(type: "INTEGER", nullable: false),
                    AdminId = table.Column<Guid>(type: "TEXT", nullable: false),
                    GymIds = table.Column<string>(type: "TEXT", nullable: false),
                    MaxGyms = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SupportRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    MemberId = table.Column<Guid>(type: "TEXT", nullable: true),
                    AssignedToStaffId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Subject = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 2000, nullable: false),
                    Priority = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false, defaultValue: "Medium"),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Open"),
                    ResolvedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrainingClasses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    MaxCapacity = table.Column<int>(type: "INTEGER", nullable: false),
                    DurationMinutes = table.Column<int>(type: "INTEGER", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingClasses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrainingSessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ClassId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TrainerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RoomId = table.Column<Guid>(type: "TEXT", nullable: true),
                    StartDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false, defaultValue: "Scheduled"),
                    Notes = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingSessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NavFlyouts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavMenuItemId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NavFlyouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NavFlyouts_NavMenuItems_NavMenuItemId",
                        column: x => x.NavMenuItemId,
                        principalTable: "NavMenuItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NavSections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavFlyoutId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NavSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NavSections_NavFlyouts_NavFlyoutId",
                        column: x => x.NavFlyoutId,
                        principalTable: "NavFlyouts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NavSectionItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavSectionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Route = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NavSectionItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NavSectionItems_NavSections_NavSectionId",
                        column: x => x.NavSectionId,
                        principalTable: "NavSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "SubscriptionId" },
                values: new object[] { new Guid("0c97fb2a-479e-44b1-9353-dea3d9f418e1"), null });

            migrationBuilder.InsertData(
                table: "LoginOptions",
                columns: new[] { "Id", "DisplayOrder", "Label", "Route" },
                values: new object[,]
                {
                    { 1, 1, "Member", "/login/member" },
                    { 2, 2, "Studio", "/login/studio" }
                });

            migrationBuilder.InsertData(
                table: "NavMenuItems",
                columns: new[] { "Id", "IconName", "IsExpandable", "Key", "Label", "Route", "SortOrder" },
                values: new object[,]
                {
                    { new Guid("1a000001-0000-0000-0000-000000000000"), "dashboard", false, "dashboard", "Dashboard", null, 1 },
                    { new Guid("1a000002-0000-0000-0000-000000000000"), "enquiries", false, "enquiries", "Enquiries", null, 2 },
                    { new Guid("1a000003-0000-0000-0000-000000000000"), "marketing", true, "marketing", "Marketing", null, 3 },
                    { new Guid("1a000004-0000-0000-0000-000000000000"), "clients", true, "clients", "Clients", null, 4 },
                    { new Guid("1a000005-0000-0000-0000-000000000000"), "training", true, "training", "Training", null, 5 },
                    { new Guid("1a000006-0000-0000-0000-000000000000"), "staff", false, "staff", "Staff", null, 6 },
                    { new Guid("1a000007-0000-0000-0000-000000000000"), "reports", true, "reports", "Reports", null, 7 },
                    { new Guid("1a000008-0000-0000-0000-000000000000"), "setup", true, "setup", "Setup", null, 8 },
                    { new Guid("1a000009-0000-0000-0000-000000000000"), "corporates", false, "corporates", "Corporates", null, 9 }
                });

            migrationBuilder.InsertData(
                table: "NavFlyouts",
                columns: new[] { "Id", "NavMenuItemId", "Title" },
                values: new object[,]
                {
                    { new Guid("1b000001-0000-0000-0000-000000000000"), new Guid("1a000004-0000-0000-0000-000000000000"), "Client Segments" },
                    { new Guid("1b000002-0000-0000-0000-000000000000"), new Guid("1a000003-0000-0000-0000-000000000000"), "Marketing" },
                    { new Guid("1b000003-0000-0000-0000-000000000000"), new Guid("1a000005-0000-0000-0000-000000000000"), "Training" }
                });

            migrationBuilder.InsertData(
                table: "NavSections",
                columns: new[] { "Id", "Label", "NavFlyoutId", "SortOrder" },
                values: new object[,]
                {
                    { new Guid("1c000001-0000-0000-0000-000000000000"), "Validity Based", new Guid("1b000001-0000-0000-0000-000000000000"), 1 },
                    { new Guid("1c000002-0000-0000-0000-000000000000"), "Purchase Type Based", new Guid("1b000001-0000-0000-0000-000000000000"), 2 },
                    { new Guid("1c000003-0000-0000-0000-000000000000"), "Service Category", new Guid("1b000001-0000-0000-0000-000000000000"), 3 },
                    { new Guid("1c000004-0000-0000-0000-000000000000"), "Behaviour Based", new Guid("1b000001-0000-0000-0000-000000000000"), 4 },
                    { new Guid("1c000005-0000-0000-0000-000000000000"), "Gender Based", new Guid("1b000001-0000-0000-0000-000000000000"), 5 },
                    { new Guid("1c000006-0000-0000-0000-000000000000"), "Multi-Club Based", new Guid("1b000001-0000-0000-0000-000000000000"), 6 },
                    { new Guid("1c000007-0000-0000-0000-000000000000"), "Custom Groups", new Guid("1b000001-0000-0000-0000-000000000000"), 7 },
                    { new Guid("1c000008-0000-0000-0000-000000000000"), "Archived", new Guid("1b000001-0000-0000-0000-000000000000"), 8 },
                    { new Guid("1c000009-0000-0000-0000-000000000000"), "Communication", new Guid("1b000002-0000-0000-0000-000000000000"), 1 },
                    { new Guid("1c000010-0000-0000-0000-000000000000"), "Engagement", new Guid("1b000002-0000-0000-0000-000000000000"), 2 },
                    { new Guid("1c000011-0000-0000-0000-000000000000"), "Data", new Guid("1b000002-0000-0000-0000-000000000000"), 3 },
                    { new Guid("1c000012-0000-0000-0000-000000000000"), "Training", new Guid("1b000003-0000-0000-0000-000000000000"), 1 }
                });

            migrationBuilder.InsertData(
                table: "NavSectionItems",
                columns: new[] { "Id", "Label", "NavSectionId", "Route", "SortOrder" },
                values: new object[,]
                {
                    { new Guid("1d000001-0000-0000-0000-000000000000"), "All Clients", new Guid("1c000001-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000002-0000-0000-0000-000000000000"), "Active Clients", new Guid("1c000001-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000003-0000-0000-0000-000000000000"), "Inactive Clients", new Guid("1c000001-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000004-0000-0000-0000-000000000000"), "Memberships", new Guid("1c000002-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000005-0000-0000-0000-000000000000"), "Single Sessions/1 Day Pass", new Guid("1c000002-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000006-0000-0000-0000-000000000000"), "Events", new Guid("1c000002-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000007-0000-0000-0000-000000000000"), "Turfs", new Guid("1c000002-0000-0000-0000-000000000000"), null, 4 },
                    { new Guid("1d000008-0000-0000-0000-000000000000"), "Store", new Guid("1c000002-0000-0000-0000-000000000000"), null, 5 },
                    { new Guid("1d000009-0000-0000-0000-000000000000"), "General Membership", new Guid("1c000003-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000010-0000-0000-0000-000000000000"), "Personal Training", new Guid("1c000003-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000011-0000-0000-0000-000000000000"), "Group Training", new Guid("1c000003-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000012-0000-0000-0000-000000000000"), "Nutrition Counselling", new Guid("1c000003-0000-0000-0000-000000000000"), null, 4 },
                    { new Guid("1d000013-0000-0000-0000-000000000000"), "Teachers Training", new Guid("1c000003-0000-0000-0000-000000000000"), null, 5 },
                    { new Guid("1d000014-0000-0000-0000-000000000000"), "Workshops/Events", new Guid("1c000003-0000-0000-0000-000000000000"), null, 6 },
                    { new Guid("1d000015-0000-0000-0000-000000000000"), "Trial", new Guid("1c000003-0000-0000-0000-000000000000"), null, 7 },
                    { new Guid("1d000016-0000-0000-0000-000000000000"), "PT Trial", new Guid("1c000003-0000-0000-0000-000000000000"), null, 8 },
                    { new Guid("1d000017-0000-0000-0000-000000000000"), "Referrers", new Guid("1c000004-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000018-0000-0000-0000-000000000000"), "Irregular Member", new Guid("1c000004-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000019-0000-0000-0000-000000000000"), "One-Time Purchasers", new Guid("1c000004-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000020-0000-0000-0000-000000000000"), "Male", new Guid("1c000005-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000021-0000-0000-0000-000000000000"), "Female", new Guid("1c000005-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000022-0000-0000-0000-000000000000"), "Not Specified", new Guid("1c000005-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000023-0000-0000-0000-000000000000"), "Age Group", new Guid("1c000005-0000-0000-0000-000000000000"), null, 4 },
                    { new Guid("1d000024-0000-0000-0000-000000000000"), "Active Clients", new Guid("1c000006-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000025-0000-0000-0000-000000000000"), "Inactive Clients", new Guid("1c000006-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000026-0000-0000-0000-000000000000"), "Batches", new Guid("1c000007-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000027-0000-0000-0000-000000000000"), "Archived Clients", new Guid("1c000008-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000028-0000-0000-0000-000000000000"), "E-Mail", new Guid("1c000009-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000029-0000-0000-0000-000000000000"), "SMS", new Guid("1c000009-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000030-0000-0000-0000-000000000000"), "WhatsApp", new Guid("1c000009-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000031-0000-0000-0000-000000000000"), "Push Notification", new Guid("1c000009-0000-0000-0000-000000000000"), null, 4 },
                    { new Guid("1d000032-0000-0000-0000-000000000000"), "Offers", new Guid("1c000010-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000033-0000-0000-0000-000000000000"), "Discount Code", new Guid("1c000010-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000034-0000-0000-0000-000000000000"), "Unqualified Data", new Guid("1c000011-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000035-0000-0000-0000-000000000000"), "Custom Mailer List", new Guid("1c000011-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000036-0000-0000-0000-000000000000"), "PT Dashboard", new Guid("1c000012-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000037-0000-0000-0000-000000000000"), "Exercise Library", new Guid("1c000012-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000038-0000-0000-0000-000000000000"), "Meal Plan Templates", new Guid("1c000012-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000039-0000-0000-0000-000000000000"), "Assessment Templates", new Guid("1c000012-0000-0000-0000-000000000000"), null, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommunicationLogs_GymId",
                table: "CommunicationLogs",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunicationLogs_RecipientId",
                table: "CommunicationLogs",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_CorporateMembers_CorporateId",
                table: "CorporateMembers",
                column: "CorporateId");

            migrationBuilder.CreateIndex(
                name: "IX_CorporateMembers_CorporateId_MemberId",
                table: "CorporateMembers",
                columns: new[] { "CorporateId", "MemberId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CorporateMembers_MemberId",
                table: "CorporateMembers",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Corporates_GymId",
                table: "Corporates",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_GymId",
                table: "Enquiries",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_EstimateItems_EstimateId",
                table: "EstimateItems",
                column: "EstimateId");

            migrationBuilder.CreateIndex(
                name: "IX_Estimates_GymId",
                table: "Estimates",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseCategories_GymId",
                table: "ExpenseCategories",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_GymId",
                table: "Expenses",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_GymServices_GymId",
                table: "GymServices",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryCategories_GymId",
                table: "InventoryCategories",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_GymId",
                table: "InventoryItems",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItems_InvoiceId",
                table: "InvoiceItems",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_GymId",
                table: "Invoices",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_InvoiceNumber",
                table: "Invoices",
                column: "InvoiceNumber");

            migrationBuilder.CreateIndex(
                name: "IX_MarketingCampaigns_GymId",
                table: "MarketingCampaigns",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Members_EnquiryId",
                table: "Members",
                column: "EnquiryId");

            migrationBuilder.CreateIndex(
                name: "IX_Members_GymId",
                table: "Members",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_MembershipPlans_GymId",
                table: "MembershipPlans",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Memberships_GymId",
                table: "Memberships",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Memberships_MemberId",
                table: "Memberships",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_NavFlyouts_NavMenuItemId",
                table: "NavFlyouts",
                column: "NavMenuItemId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NavMenuItems_Key",
                table: "NavMenuItems",
                column: "Key",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NavSectionItems_NavSectionId",
                table: "NavSectionItems",
                column: "NavSectionId");

            migrationBuilder.CreateIndex(
                name: "IX_NavSections_NavFlyoutId",
                table: "NavSections",
                column: "NavFlyoutId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionBookings_MemberId",
                table: "SessionBookings",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionBookings_SessionId",
                table: "SessionBookings",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionBookings_SessionId_MemberId",
                table: "SessionBookings",
                columns: new[] { "SessionId", "MemberId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Staff_GymId",
                table: "Staff",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Staff_GymId_StaffCode",
                table: "Staff",
                columns: new[] { "GymId", "StaffCode" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudioUsers_Email",
                table: "StudioUsers",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SupportRequests_GymId",
                table: "SupportRequests",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingClasses_GymId",
                table: "TrainingClasses",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_ClassId",
                table: "TrainingSessions",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_GymId",
                table: "TrainingSessions",
                column: "GymId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "CommunicationLogs");

            migrationBuilder.DropTable(
                name: "CorporateMembers");

            migrationBuilder.DropTable(
                name: "Corporates");

            migrationBuilder.DropTable(
                name: "Enquiries");

            migrationBuilder.DropTable(
                name: "EstimateItems");

            migrationBuilder.DropTable(
                name: "Estimates");

            migrationBuilder.DropTable(
                name: "ExpenseCategories");

            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "Gyms");

            migrationBuilder.DropTable(
                name: "GymServices");

            migrationBuilder.DropTable(
                name: "InventoryCategories");

            migrationBuilder.DropTable(
                name: "InventoryItems");

            migrationBuilder.DropTable(
                name: "InvoiceItems");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "LoginOptions");

            migrationBuilder.DropTable(
                name: "MarketingCampaigns");

            migrationBuilder.DropTable(
                name: "Members");

            migrationBuilder.DropTable(
                name: "MembershipPlans");

            migrationBuilder.DropTable(
                name: "Memberships");

            migrationBuilder.DropTable(
                name: "NavSectionItems");

            migrationBuilder.DropTable(
                name: "SessionBookings");

            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropTable(
                name: "StudioUsers");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "SupportRequests");

            migrationBuilder.DropTable(
                name: "TrainingClasses");

            migrationBuilder.DropTable(
                name: "TrainingSessions");

            migrationBuilder.DropTable(
                name: "NavSections");

            migrationBuilder.DropTable(
                name: "NavFlyouts");

            migrationBuilder.DropTable(
                name: "NavMenuItems");
        }
    }
}
