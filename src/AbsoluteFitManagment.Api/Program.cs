using AbsoluteFitManagement.Application;
using AbsoluteFitManagement.Infrastructure;
using AbsoluteFitManagement.Infrastructure.Common.Auth;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

// Initialize database on startup.
// SQLite: EnsureCreated creates the schema from the model with correct native types.
// SqlServer: MigrateAsync runs versioned migrations.
var dbProvider = builder.Configuration["DatabaseProvider"] ?? "Sqlite";
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AbsoluteFitManagementDbContext>();

    if (dbProvider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase))
        await db.Database.MigrateAsync();
    else
        await db.Database.EnsureCreatedAsync();
}

if (app.Environment.IsDevelopment())
{
    await DataSeeder.SeedAsync(app.Services);
}

app.Run();
