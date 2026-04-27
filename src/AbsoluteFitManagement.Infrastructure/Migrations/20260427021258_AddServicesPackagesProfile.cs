using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddServicesPackagesProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GymPackages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GymPackages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GymProfiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Country = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false, defaultValue: "India"),
                    StateRegion = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    City = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Locality = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Currency = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false, defaultValue: "₹"),
                    Region = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Timezone = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    BusinessType = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    BrandName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    PhoneNumber = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Latitude = table.Column<double>(type: "REAL", nullable: false),
                    Longitude = table.Column<double>(type: "REAL", nullable: false),
                    Address = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    AreaSqft = table.Column<double>(type: "REAL", nullable: false),
                    OperatingHoursJson = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GymProfiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceVariations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ServiceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ServiceType = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    ServiceFee = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TimeHours = table.Column<int>(type: "INTEGER", nullable: false),
                    TimeMinutes = table.Column<int>(type: "INTEGER", nullable: false),
                    ValidityDays = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxMembers = table.Column<int>(type: "INTEGER", nullable: false),
                    Tax = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false, defaultValue: "No Tax"),
                    Category = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    OtpVerification = table.Column<bool>(type: "INTEGER", nullable: false),
                    Upgradable = table.Column<bool>(type: "INTEGER", nullable: false),
                    Transferable = table.Column<bool>(type: "INTEGER", nullable: false),
                    AppointmentsApplicable = table.Column<bool>(type: "INTEGER", nullable: false),
                    RegistrationFee = table.Column<bool>(type: "INTEGER", nullable: false),
                    MinFeeLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaxFeeLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EligibleForReferralBonus = table.Column<bool>(type: "INTEGER", nullable: false),
                    ReferralBonusFromPurchase = table.Column<bool>(type: "INTEGER", nullable: false),
                    PromoteOnline = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceVariations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GymPackageItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    PackageId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ServiceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ServiceName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    ServiceFee = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DiscountType = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false, defaultValue: "%")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GymPackageItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GymPackageItems_GymPackages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "GymPackages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GymPackageItems_PackageId",
                table: "GymPackageItems",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_GymPackages_GymId",
                table: "GymPackages",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_GymProfiles_GymId",
                table: "GymProfiles",
                column: "GymId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ServiceVariations_GymId",
                table: "ServiceVariations",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceVariations_ServiceId",
                table: "ServiceVariations",
                column: "ServiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GymPackageItems");

            migrationBuilder.DropTable(
                name: "GymProfiles");

            migrationBuilder.DropTable(
                name: "ServiceVariations");

            migrationBuilder.DropTable(
                name: "GymPackages");
        }
    }
}
