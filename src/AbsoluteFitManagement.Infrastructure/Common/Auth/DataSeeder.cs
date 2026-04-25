using AbsoluteFitManagement.Domain.Gyms;
using AbsoluteFitManagement.Domain.Subscriptions;
using AbsoluteFitManagement.Domain.Users;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AbsoluteFitManagement.Infrastructure.Common.Auth;

public static class DataSeeder
{
    private static readonly Guid SeedAdminId        = Guid.Parse("0c97fb2a-479e-44b1-9353-dea3d9f418e1");
    private static readonly Guid SeedSubscriptionId = Guid.Parse("a1b2c3d4-e5f6-7890-abcd-ef0123456789");
    private static readonly Guid SeedGym1Id         = Guid.Parse("11111111-1111-1111-1111-111111111111");
    private static readonly Guid SeedGym2Id         = Guid.Parse("22222222-2222-2222-2222-222222222222");
    private const string SeedEmail    = "admin@absolutefit.com";
    private const string SeedPassword = "Admin@123";

    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db     = scope.ServiceProvider.GetRequiredService<AbsoluteFitManagementDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<AbsoluteFitManagementDbContext>>();

        await SeedSubscriptionAndGymsAsync(db, logger);
        await SeedAdminUserAsync(db, logger);
    }

    private static async Task SeedSubscriptionAndGymsAsync(
        AbsoluteFitManagementDbContext db, ILogger logger)
    {
        if (await db.Subscriptions.AnyAsync(s => s.Id == SeedSubscriptionId))
            return;

        var subscription = new Subscription(
            subscriptionType: SubscriptionType.Starter,
            adminId: SeedAdminId,
            id: SeedSubscriptionId);

        var gym1 = new Gym(
            name: "AbsoluteFit Gym and Wellness Studio",
            maxRooms: 3,
            subscriptionId: SeedSubscriptionId,
            id: SeedGym1Id,
            locality: "Marathahalli",
            city: "Bengaluru",
            branchCode: 6714);

        var gym2 = new Gym(
            name: "Absolute fit",
            maxRooms: 3,
            subscriptionId: SeedSubscriptionId,
            id: SeedGym2Id,
            locality: "Hegganahalli",
            city: "Bengaluru",
            branchCode: 6853);

        subscription.AddGym(gym1);
        subscription.AddGym(gym2);

        var admin = await db.Admins.FirstOrDefaultAsync(a => a.Id == SeedAdminId);
        if (admin is not null)
            admin.SetSubscription(subscription);

        await db.Subscriptions.AddAsync(subscription);
        await db.Gyms.AddRangeAsync(gym1, gym2);
        await db.SaveChangesAsync();

        logger.LogInformation("Seeded demo subscription and 2 gyms.");
    }

    private static async Task SeedAdminUserAsync(
        AbsoluteFitManagementDbContext db, ILogger logger)
    {
        if (await db.StudioUsers.AnyAsync(u => u.Email == SeedEmail))
            return;

        var user = new StudioUser(
            email: SeedEmail,
            passwordHash: PasswordHasher.Hash(SeedPassword),
            adminId: SeedAdminId);

        await db.StudioUsers.AddAsync(user);
        await db.SaveChangesAsync();

        logger.LogInformation("Seeded admin studio user: {Email} / {Password}", SeedEmail, SeedPassword);
    }
}
