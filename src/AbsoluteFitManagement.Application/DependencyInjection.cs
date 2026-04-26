using AbsoluteFitManagement.Domain.Enquiries.Factories;
using AbsoluteFitManagement.Domain.Members.Factories;
using AbsoluteFitManagement.Domain.Members.Strategies;
using AbsoluteFitManagement.Domain.Staff.Factories;
using AbsoluteFitManagement.Domain.Subscriptions.Factories;
using AbsoluteFitManagement.Domain.Users.Factories;
using Microsoft.Extensions.DependencyInjection;

namespace AbsoluteFitManagement.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(options =>
        {
            options.RegisterServicesFromAssemblyContaining(typeof(DependencyInjection));
        });

        services.AddFactories();
        services.AddDomainStrategies();

        return services;
    }

    private static IServiceCollection AddFactories(this IServiceCollection services)
    {
        services.AddSingleton<EnquiryFactory>();
        services.AddSingleton<MemberFactory>();
        services.AddSingleton<MembershipFactory>();
        services.AddSingleton<StaffMemberFactory>();
        services.AddSingleton<SubscriptionFactory>();
        services.AddSingleton<StudioUserFactory>();
        return services;
    }

    private static IServiceCollection AddDomainStrategies(this IServiceCollection services)
    {
        // Default membership pricing strategy — callers can override per-request
        // using CorporateMembershipPricingStrategy or DiscountedMembershipPricingStrategy.
        services.AddTransient<IMembershipPricingStrategy, RegularMembershipPricingStrategy>();
        return services;
    }
}
