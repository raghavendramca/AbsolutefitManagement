using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Infrastructure.Admins.Persistence;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using AbsoluteFitManagement.Infrastructure.Enquiries.Persistence;
using AbsoluteFitManagement.Infrastructure.Packages.Persistence;
using AbsoluteFitManagement.Infrastructure.Services.Persistence;
using AbsoluteFitManagement.Infrastructure.Members.Persistence;
using AbsoluteFitManagement.Infrastructure.Setup.Persistence;
using AbsoluteFitManagement.Infrastructure.Subscriptions.Persistence;
using AbsoluteFitManagement.Infrastructure.Users.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AbsoluteFitManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddPersistence(configuration);
    }

    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var provider = configuration["DatabaseProvider"]
            ?? throw new InvalidOperationException("'DatabaseProvider' is not set in configuration.");

        services.AddDbContext<AbsoluteFitManagementDbContext>(options =>
            ConfigureProvider(options, provider, configuration));

        services.AddScoped<ISubscriptionsRepository, SubscriptionsRepository>();
        services.AddScoped<IAdminsRepository, AdminsRepository>();
        services.AddScoped<IGymsRepository, GymsRepository>();
        services.AddScoped<IStudioUsersRepository, StudioUsersRepository>();
        services.AddScoped<IEnquiriesRepository, EnquiriesRepository>();
        services.AddScoped<IGymServicesRepository, GymServicesRepository>();
        services.AddScoped<IGymPackagesRepository, GymPackagesRepository>();
        services.AddScoped<IGymProfileRepository, GymProfileRepository>();
        services.AddScoped<IFormCustomizationRepository, FormCustomizationRepository>();
        services.AddScoped<IFitnessProfileItemRepository, FitnessProfileItemRepository>();
        services.AddScoped<IApparelItemRepository, ApparelItemRepository>();
        services.AddScoped<IBillTemplateRepository, BillTemplateRepository>();
        services.AddScoped<IBillSettingsRepository, BillSettingsRepository>();
        services.AddScoped<IMembersRepository, MembersRepository>();
        services.AddScoped<IUnitOfWork>(sp =>
            sp.GetRequiredService<AbsoluteFitManagementDbContext>());

        return services;
    }

    private static void ConfigureProvider(
        DbContextOptionsBuilder options,
        string provider,
        IConfiguration configuration)
    {
        switch (provider.ToLowerInvariant())
        {
            case "sqlserver":
                var sqlServerConn = configuration.GetConnectionString("SqlServer")
                    ?? throw new InvalidOperationException("Connection string 'SqlServer' not found.");
                options.UseSqlServer(sqlServerConn);
                break;

            case "sqlite":
                var sqliteConn = configuration.GetConnectionString("Sqlite")
                    ?? "Data Source=AbsoluteFitManagement.db";
                options.UseSqlite(sqliteConn);
                break;

            default:
                throw new InvalidOperationException(
                    $"Unsupported DatabaseProvider '{provider}'. " +
                    "Supported values: 'Sqlite', 'SqlServer'.");
        }
    }
}
