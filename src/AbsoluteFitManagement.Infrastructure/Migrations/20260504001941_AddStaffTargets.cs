using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStaffTargets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StaffTargets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    GymId = table.Column<string>(type: "TEXT", nullable: false),
                    StaffId = table.Column<string>(type: "TEXT", nullable: false),
                    TargetCategory = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TargetType = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Year = table.Column<int>(type: "INTEGER", nullable: false),
                    MonthlyValuesJson = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffTargets", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StaffTargets_GymId",
                table: "StaffTargets",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffTargets_StaffId",
                table: "StaffTargets",
                column: "StaffId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "StaffTargets");
        }
    }
}
