using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Infrastructure.Admins.Persistence;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using AbsoluteFitManagement.Infrastructure.Subscriptions.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AbsoluteFitManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        return services.AddPersistence();
    }

    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        services.AddDbContext<AbsoluteFitManagementDbContext>(options => 
            options.UseSqlite("Data Source = AbsoluteFitManagement.db"));
            
        services.AddScoped<ISubscriptionsRepository, SubscriptionsRepository>();
        services.AddScoped<IAdminsRepository, AdminsRepository>();
        services.AddScoped<IGymsRepository, GymsRepository>();
        services.AddScoped<IUnitOfWork>(services => 
            services.GetRequiredService<AbsoluteFitManagementDbContext>());
            
        return services;
    }
}