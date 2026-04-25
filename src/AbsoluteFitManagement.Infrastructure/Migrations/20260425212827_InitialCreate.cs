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
                    Id = table.Column<Guid>(nullable: false),
                    SubscriptionId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gyms",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    SubscriptionId = table.Column<Guid>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: false),
                    Locality = table.Column<string>(maxLength: 200, nullable: false, defaultValue: ""),
                    City = table.Column<string>(maxLength: 200, nullable: false, defaultValue: ""),
                    BranchCode = table.Column<int>(nullable: false, defaultValue: 0),
                    MaxRooms = table.Column<int>(nullable: false),
                    RoomIds = table.Column<string>(nullable: false),
                    TrainerIds = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gyms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoginOptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                        .Annotation("Sqlite:Autoincrement", true),
                    Label = table.Column<string>(maxLength: 100, nullable: false),
                    Route = table.Column<string>(maxLength: 200, nullable: false),
                    DisplayOrder = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoginOptions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudioUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Email = table.Column<string>(maxLength: 256, nullable: false),
                    PasswordHash = table.Column<string>(maxLength: 512, nullable: false),
                    AdminId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudioUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SubscriptionType = table.Column<int>(nullable: false),
                    AdminId = table.Column<Guid>(nullable: false),
                    GymIds = table.Column<string>(nullable: false),
                    MaxGyms = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
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

            migrationBuilder.CreateIndex(
                name: "IX_StudioUsers_Email",
                table: "StudioUsers",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "Admins");
            migrationBuilder.DropTable(name: "Gyms");
            migrationBuilder.DropTable(name: "LoginOptions");
            migrationBuilder.DropTable(name: "StudioUsers");
            migrationBuilder.DropTable(name: "Subscriptions");
        }
    }
}
