using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBranchDetails : Migration
    {
        // Well-known seed GUIDs
        private const string SeedSubscriptionId = "a1b2c3d4-e5f6-7890-abcd-ef0123456789";
        private const string SeedAdminId        = "0c97fb2a-479e-44b1-9353-dea3d9f418e1";
        private const string SeedGym1Id         = "11111111-1111-1111-1111-111111111111";
        private const string SeedGym2Id         = "22222222-2222-2222-2222-222222222222";

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ── Add branch-detail columns to Gyms ────────────────────────────
            migrationBuilder.AddColumn<string>(
                name: "TenantId",
                table: "Gyms",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Locality",
                table: "Gyms",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Gyms",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "BranchCode",
                table: "Gyms",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            // Backfill TenantId = SubscriptionId for any existing rows
            migrationBuilder.Sql("UPDATE Gyms SET TenantId = SubscriptionId");

            // ── Seed: link the default Admin to a Subscription ───────────────
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: SeedAdminId,
                column: "SubscriptionId",
                value: SeedSubscriptionId);

            // ── Seed: default Subscription (Starter = 1) ─────────────────────
            migrationBuilder.InsertData(
                table: "Subscriptions",
                columns: new[] { "Id", "AdminId", "SubscriptionType", "GymIds", "MaxGyms" },
                values: new object[]
                {
                    SeedSubscriptionId,
                    SeedAdminId,
                    1,   // Starter
                    $"{SeedGym1Id},{SeedGym2Id}",
                    2
                });

            // ── Seed: two demo branches ───────────────────────────────────────
            migrationBuilder.InsertData(
                table: "Gyms",
                columns: new[] { "Id", "Name", "SubscriptionId", "TenantId", "Locality", "City", "BranchCode", "MaxRooms", "RoomIds", "TrainerIds" },
                values: new object[,]
                {
                    {
                        SeedGym1Id,
                        "AbsoluteFit Gym and Wellness Studio",
                        SeedSubscriptionId,
                        SeedSubscriptionId,
                        "Marathahalli",
                        "Bengaluru",
                        6714,
                        3,
                        "",
                        ""
                    },
                    {
                        SeedGym2Id,
                        "Absolute fit",
                        SeedSubscriptionId,
                        SeedSubscriptionId,
                        "Hegganahalli",
                        "Bengaluru",
                        6853,
                        3,
                        "",
                        ""
                    }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(table: "Gyms",        keyColumn: "Id", keyValues: new object[] { SeedGym1Id, SeedGym2Id });
            migrationBuilder.DeleteData(table: "Subscriptions", keyColumn: "Id", keyValue: SeedSubscriptionId);
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: SeedAdminId,
                column: "SubscriptionId",
                value: null);

            migrationBuilder.DropColumn(name: "BranchCode", table: "Gyms");
            migrationBuilder.DropColumn(name: "City",       table: "Gyms");
            migrationBuilder.DropColumn(name: "Locality",   table: "Gyms");
            migrationBuilder.DropColumn(name: "TenantId",   table: "Gyms");
        }
    }
}
