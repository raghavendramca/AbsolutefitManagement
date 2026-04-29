using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateQuickAddMenuItemsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // The stub migrations AddQuickAddMenuItems and AddQuickAddMenuAndTrialScheduling
            // never actually created this table. Create it now.
            migrationBuilder.Sql(@"
                CREATE TABLE IF NOT EXISTS ""QuickAddMenuItems"" (
                    ""Id""           TEXT NOT NULL CONSTRAINT ""PK_QuickAddMenuItems"" PRIMARY KEY,
                    ""Key""          TEXT NOT NULL,
                    ""Label""        TEXT NOT NULL,
                    ""SortOrder""    INTEGER NOT NULL,
                    ""IsActive""     INTEGER NOT NULL,
                    ""RequiredRole"" TEXT NULL
                );
                CREATE UNIQUE INDEX IF NOT EXISTS ""IX_QuickAddMenuItems_Key""
                    ON ""QuickAddMenuItems"" (""Key"");

                INSERT OR IGNORE INTO ""QuickAddMenuItems"" (""Id"",""Key"",""Label"",""SortOrder"",""IsActive"",""RequiredRole"") VALUES
                ('2a000001-0000-0000-0000-000000000000','enquiry','Enquiry',1,1,NULL),
                ('2a000002-0000-0000-0000-000000000000','member','Member',2,1,NULL),
                ('2a000003-0000-0000-0000-000000000000','staff','Staff',3,1,'Admin'),
                ('2a000004-0000-0000-0000-000000000000','inventory','Inventory',4,1,'Admin'),
                ('2a000005-0000-0000-0000-000000000000','expense','Expense',5,1,NULL),
                ('2a000006-0000-0000-0000-000000000000','estimate','Estimate',6,1,NULL),
                ('2a000007-0000-0000-0000-000000000000','invoice','Invoice',7,1,NULL),
                ('2a000008-0000-0000-0000-000000000000','support','Support request',8,1,NULL);
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP TABLE IF EXISTS ""QuickAddMenuItems"";");
        }
    }
}
