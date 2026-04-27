using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSetupMenuSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "NavFlyouts",
                columns: new[] { "Id", "NavMenuItemId", "Title" },
                values: new object[] { new Guid("1b000004-0000-0000-0000-000000000000"), new Guid("1a000008-0000-0000-0000-000000000000"), "Setup" });

            migrationBuilder.InsertData(
                table: "NavSections",
                columns: new[] { "Id", "Label", "NavFlyoutId", "SortOrder" },
                values: new object[,]
                {
                    { new Guid("1c000013-0000-0000-0000-000000000000"), "General", new Guid("1b000004-0000-0000-0000-000000000000"), 1 },
                    { new Guid("1c000014-0000-0000-0000-000000000000"), "Marketing", new Guid("1b000004-0000-0000-0000-000000000000"), 2 },
                    { new Guid("1c000015-0000-0000-0000-000000000000"), "Client Management", new Guid("1b000004-0000-0000-0000-000000000000"), 3 },
                    { new Guid("1c000016-0000-0000-0000-000000000000"), "Training", new Guid("1b000004-0000-0000-0000-000000000000"), 4 },
                    { new Guid("1c000017-0000-0000-0000-000000000000"), "Staff Management", new Guid("1b000004-0000-0000-0000-000000000000"), 5 },
                    { new Guid("1c000018-0000-0000-0000-000000000000"), "Inventory", new Guid("1b000004-0000-0000-0000-000000000000"), 6 },
                    { new Guid("1c000019-0000-0000-0000-000000000000"), "Expense", new Guid("1b000004-0000-0000-0000-000000000000"), 7 },
                    { new Guid("1c000020-0000-0000-0000-000000000000"), "Integrations", new Guid("1b000004-0000-0000-0000-000000000000"), 8 }
                });

            migrationBuilder.InsertData(
                table: "NavSectionItems",
                columns: new[] { "Id", "Label", "NavSectionId", "Route", "SortOrder" },
                values: new object[,]
                {
                    { new Guid("1d000040-0000-0000-0000-000000000000"), "Getting Started", new Guid("1c000013-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000041-0000-0000-0000-000000000000"), "Profile", new Guid("1c000013-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000042-0000-0000-0000-000000000000"), "Manage Services", new Guid("1c000013-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000043-0000-0000-0000-000000000000"), "Manage Packages", new Guid("1c000013-0000-0000-0000-000000000000"), null, 4 },
                    { new Guid("1d000044-0000-0000-0000-000000000000"), "Form Customization", new Guid("1c000013-0000-0000-0000-000000000000"), null, 5 },
                    { new Guid("1d000045-0000-0000-0000-000000000000"), "Bill Template", new Guid("1c000013-0000-0000-0000-000000000000"), null, 6 },
                    { new Guid("1d000046-0000-0000-0000-000000000000"), "Define Tax", new Guid("1c000013-0000-0000-0000-000000000000"), null, 7 },
                    { new Guid("1d000047-0000-0000-0000-000000000000"), "Checkin Notification", new Guid("1c000013-0000-0000-0000-000000000000"), null, 8 },
                    { new Guid("1d000048-0000-0000-0000-000000000000"), "Club Agreement", new Guid("1c000013-0000-0000-0000-000000000000"), null, 9 },
                    { new Guid("1d000049-0000-0000-0000-000000000000"), "Task Setup", new Guid("1c000013-0000-0000-0000-000000000000"), null, 10 },
                    { new Guid("1d000050-0000-0000-0000-000000000000"), "Trial", new Guid("1c000013-0000-0000-0000-000000000000"), null, 11 },
                    { new Guid("1d000051-0000-0000-0000-000000000000"), "Service Resource", new Guid("1c000013-0000-0000-0000-000000000000"), null, 12 },
                    { new Guid("1d000052-0000-0000-0000-000000000000"), "ID Card", new Guid("1c000013-0000-0000-0000-000000000000"), null, 13 },
                    { new Guid("1d000053-0000-0000-0000-000000000000"), "Bulk Data Deletion", new Guid("1c000013-0000-0000-0000-000000000000"), null, 14 },
                    { new Guid("1d000054-0000-0000-0000-000000000000"), "Report Format", new Guid("1c000013-0000-0000-0000-000000000000"), null, 15 },
                    { new Guid("1d000055-0000-0000-0000-000000000000"), "Help", new Guid("1c000013-0000-0000-0000-000000000000"), null, 16 },
                    { new Guid("1d000056-0000-0000-0000-000000000000"), "Import Enquiry", new Guid("1c000013-0000-0000-0000-000000000000"), null, 17 },
                    { new Guid("1d000057-0000-0000-0000-000000000000"), "Email Templates", new Guid("1c000014-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000058-0000-0000-0000-000000000000"), "SMS Templates", new Guid("1c000014-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000059-0000-0000-0000-000000000000"), "WhatsApp Templates", new Guid("1c000014-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000060-0000-0000-0000-000000000000"), "Membership Plans", new Guid("1c000015-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000061-0000-0000-0000-000000000000"), "Packages", new Guid("1c000015-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000062-0000-0000-0000-000000000000"), "Add-ons", new Guid("1c000015-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000063-0000-0000-0000-000000000000"), "Trainer Profiles", new Guid("1c000016-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000064-0000-0000-0000-000000000000"), "Class Types", new Guid("1c000016-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000065-0000-0000-0000-000000000000"), "Schedules", new Guid("1c000016-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000066-0000-0000-0000-000000000000"), "Roles & Permissions", new Guid("1c000017-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000067-0000-0000-0000-000000000000"), "Attendance Settings", new Guid("1c000017-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000068-0000-0000-0000-000000000000"), "Targets", new Guid("1c000017-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000069-0000-0000-0000-000000000000"), "Categories", new Guid("1c000018-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000070-0000-0000-0000-000000000000"), "Products", new Guid("1c000018-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000071-0000-0000-0000-000000000000"), "Suppliers", new Guid("1c000018-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000072-0000-0000-0000-000000000000"), "Expense Categories", new Guid("1c000019-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000073-0000-0000-0000-000000000000"), "Vendors", new Guid("1c000019-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000074-0000-0000-0000-000000000000"), "Recurring Expenses", new Guid("1c000019-0000-0000-0000-000000000000"), null, 3 },
                    { new Guid("1d000075-0000-0000-0000-000000000000"), "Payment Gateway", new Guid("1c000020-0000-0000-0000-000000000000"), null, 1 },
                    { new Guid("1d000076-0000-0000-0000-000000000000"), "SMS Gateway", new Guid("1c000020-0000-0000-0000-000000000000"), null, 2 },
                    { new Guid("1d000077-0000-0000-0000-000000000000"), "Email Gateway", new Guid("1c000020-0000-0000-0000-000000000000"), null, 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000040-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000041-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000042-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000043-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000044-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000045-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000046-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000047-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000048-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000049-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000050-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000051-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000052-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000053-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000054-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000055-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000056-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000057-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000058-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000059-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000060-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000061-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000062-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000063-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000064-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000065-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000066-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000067-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000068-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000069-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000070-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000071-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000072-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000073-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000074-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000075-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000076-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000077-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000013-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000014-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000015-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000016-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000017-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000018-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000019-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000020-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavFlyouts",
                keyColumn: "Id",
                keyValue: new Guid("1b000004-0000-0000-0000-000000000000"));
        }
    }
}
