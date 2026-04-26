using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddQuickAddMenuAndTrialScheduling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // QuickAddMenuItems table already created by the AddQuickAddMenuItems stub migration.
            // This migration only adds the trial-scheduling columns to the Enquiries table.

            migrationBuilder.AddColumn<DateTime>(
                name: "TrialScheduledAt",
                table: "Enquiries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrialService",
                table: "Enquiries",
                type: "TEXT",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrialStaffName",
                table: "Enquiries",
                type: "TEXT",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrialClass",
                table: "Enquiries",
                type: "TEXT",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrialSession",
                table: "Enquiries",
                type: "TEXT",
                maxLength: 200,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "TrialScheduledAt", table: "Enquiries");
            migrationBuilder.DropColumn(name: "TrialService",      table: "Enquiries");
            migrationBuilder.DropColumn(name: "TrialStaffName",    table: "Enquiries");
            migrationBuilder.DropColumn(name: "TrialClass",        table: "Enquiries");
            migrationBuilder.DropColumn(name: "TrialSession",      table: "Enquiries");
        }
    }
}
