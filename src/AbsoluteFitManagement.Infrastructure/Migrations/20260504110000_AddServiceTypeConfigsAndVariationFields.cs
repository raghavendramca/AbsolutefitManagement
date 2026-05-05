using System;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    [DbContext(typeof(AbsoluteFitManagementDbContext))]
    [Migration("20260504110000_AddServiceTypeConfigsAndVariationFields")]
    public partial class AddServiceTypeConfigsAndVariationFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceTypeConfigs",
                columns: table => new
                {
                    Id                       = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name                     = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    SortOrder                = table.Column<int>(type: "INTEGER", nullable: false),
                    ShowDaysPerWeek          = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowMonths               = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowTimeHours            = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowTimeMinutes          = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowNumberOfSessions     = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowValidityDays         = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ValidityDaysIsDropdown   = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowMaxMembers           = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowAccessType           = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowCategory             = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowOtpVerification      = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowUpgradable           = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowTransferable         = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowAllowFreeze          = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowFreezeDays           = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowAppointmentsApplicable = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowRegistrationFee      = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowFeeLimits            = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    ShowReferralBonus        = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    ShowTermBatchDate        = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceTypeConfigs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceTypeConfigs_Name",
                table: "ServiceTypeConfigs",
                column: "Name",
                unique: true);

            // New columns on ServiceVariations
            migrationBuilder.AddColumn<int>(
                name: "DaysPerWeek",
                table: "ServiceVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Months",
                table: "ServiceVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfSessions",
                table: "ServiceVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 2);

            migrationBuilder.AddColumn<string>(
                name: "AccessType",
                table: "ServiceVariations",
                type: "TEXT",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AllowFreeze",
                table: "ServiceVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MaxFreezeDays",
                table: "ServiceVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinFreezeDays",
                table: "ServiceVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<bool>(
                name: "TermBatchDate",
                table: "ServiceVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "ServiceTypeConfigs");

            migrationBuilder.DropColumn(name: "DaysPerWeek",        table: "ServiceVariations");
            migrationBuilder.DropColumn(name: "Months",             table: "ServiceVariations");
            migrationBuilder.DropColumn(name: "NumberOfSessions",   table: "ServiceVariations");
            migrationBuilder.DropColumn(name: "AccessType",         table: "ServiceVariations");
            migrationBuilder.DropColumn(name: "AllowFreeze",        table: "ServiceVariations");
            migrationBuilder.DropColumn(name: "MaxFreezeDays",      table: "ServiceVariations");
            migrationBuilder.DropColumn(name: "MinFreezeDays",      table: "ServiceVariations");
            migrationBuilder.DropColumn(name: "TermBatchDate",      table: "ServiceVariations");
        }
    }
}
