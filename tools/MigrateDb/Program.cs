using System;
using Microsoft.Data.Sqlite;

var dbPath = @"c:\workfolder\AbsoluteFitProject\AbsolutefitManagement\src\AbsoluteFitManagment.Api\AbsoluteFitManagement.db";
var connectionString = $"Data Source={dbPath}";

using var connection = new SqliteConnection(connectionString);
connection.Open();

var migrationId = "20260502000000_AddTemplateJsonToBillTemplates";

// Check if migration already applied
using (var check = connection.CreateCommand())
{
    check.CommandText = "SELECT COUNT(*) FROM __EFMigrationsHistory WHERE MigrationId = @id";
    check.Parameters.AddWithValue("@id", migrationId);
    var count = (long)(check.ExecuteScalar() ?? 0L);
    if (count > 0)
    {
        Console.WriteLine($"Migration '{migrationId}' already applied.");
        return;
    }
}

// Add TemplateJson column to BillTemplates
using (var cmd = connection.CreateCommand())
{
    cmd.CommandText = "ALTER TABLE BillTemplates ADD COLUMN TemplateJson TEXT NULL;";
    cmd.ExecuteNonQuery();
    Console.WriteLine("Added TemplateJson column to BillTemplates.");
}

// Record migration
using (var insert = connection.CreateCommand())
{
    insert.CommandText = "INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion) VALUES (@id, @ver)";
    insert.Parameters.AddWithValue("@id", migrationId);
    insert.Parameters.AddWithValue("@ver", "10.0.0");
    insert.ExecuteNonQuery();
    Console.WriteLine($"Recorded migration '{migrationId}'.");
}

Console.WriteLine("Migration applied successfully.");
