using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStaffCodeAndNavFlyouts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminRights",
                table: "Staff",
                type: "TEXT",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AttendanceId",
                table: "Staff",
                type: "TEXT",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StaffCode",
                table: "Staff",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "NavFlyouts",
                columns: new[] { "Id", "NavMenuItemId", "Title" },
                values: new object[,]
                {
                    { new Guid("1b000002-0000-0000-0000-000000000000"), new Guid("1a000003-0000-0000-0000-000000000000"), "Marketing" },
                    { new Guid("1b000003-0000-0000-0000-000000000000"), new Guid("1a000005-0000-0000-0000-000000000000"), "Training" }
                });

            migrationBuilder.InsertData(
                table: "NavSections",
                columns: new[] { "Id", "Label", "NavFlyoutId", "SortOrder" },
                values: new object[,]
                {
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
                name: "IX_Staff_GymId_StaffCode",
                table: "Staff",
                columns: new[] { "GymId", "StaffCode" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Staff_GymId_StaffCode",
                table: "Staff");

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000028-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000029-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000030-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000031-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000032-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000033-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000034-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000035-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000036-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000037-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000038-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSectionItems",
                keyColumn: "Id",
                keyValue: new Guid("1d000039-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000009-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000010-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000011-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavSections",
                keyColumn: "Id",
                keyValue: new Guid("1c000012-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavFlyouts",
                keyColumn: "Id",
                keyValue: new Guid("1b000002-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "NavFlyouts",
                keyColumn: "Id",
                keyValue: new Guid("1b000003-0000-0000-0000-000000000000"));

            migrationBuilder.DropColumn(
                name: "AdminRights",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "AttendanceId",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "StaffCode",
                table: "Staff");
        }
    }
}
