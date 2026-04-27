using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGymServiceCategoryFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CategoryType",
                table: "GymServices",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                defaultValue: "Brand");

            migrationBuilder.AddColumn<string>(
                name: "SacCode",
                table: "GymServices",
                type: "TEXT",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tax",
                table: "GymServices",
                type: "TEXT",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryType",
                table: "GymServices");

            migrationBuilder.DropColumn(
                name: "SacCode",
                table: "GymServices");

            migrationBuilder.DropColumn(
                name: "Tax",
                table: "GymServices");
        }
    }
}
