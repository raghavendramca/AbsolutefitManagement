using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPackageIsDisabledFromSelling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDisabledFromSelling",
                table: "GymPackages",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDisabledFromSelling",
                table: "GymPackages");
        }
    }
}
