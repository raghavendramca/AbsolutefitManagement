using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateBillTemplatesAndSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BillTemplates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false),
                    State = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    GstNumber = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    BusinessName = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillTemplates", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillTemplates_GymId",
                table: "BillTemplates",
                column: "GymId");

            migrationBuilder.CreateTable(
                name: "BillSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    GymId = table.Column<Guid>(type: "TEXT", nullable: false),
                    SettingKey = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    SettingsJson = table.Column<string>(type: "TEXT", maxLength: 4000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillSettings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillSettings_GymId_SettingKey",
                table: "BillSettings",
                columns: new[] { "GymId", "SettingKey" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "BillTemplates");
            migrationBuilder.DropTable(name: "BillSettings");
        }
    }
}
