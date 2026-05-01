using AbsoluteFitManagement.Domain.Gyms;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Domain.Staff;
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
    private static readonly Guid SeedGym3Id         = Guid.Parse("33333333-3333-3333-3333-333333333333");
    private static readonly Guid SeedGym4Id         = Guid.Parse("44444444-4444-4444-4444-444444444444");
    private static readonly Guid SeedGym5Id         = Guid.Parse("55555555-5555-5555-5555-555555555555");
    private const string SeedEmail    = "admin@absolutefit.com";
    private const string SeedPassword = "Admin@123";

    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db     = scope.ServiceProvider.GetRequiredService<AbsoluteFitManagementDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<AbsoluteFitManagementDbContext>>();

        await SeedSubscriptionAndGymsAsync(db, logger);
        await SeedAdditionalGymsAsync(db, logger);
        await SeedAdminUserAsync(db, logger);
        await SeedStaffAsync(db, logger);
        await SeedFitnessProfileItemsAsync(db, logger);
        await SeedApparelItemsAsync(db, logger);
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

    private static async Task SeedAdditionalGymsAsync(
        AbsoluteFitManagementDbContext db, ILogger logger)
    {
        var extraGyms = new[]
        {
            (Id: SeedGym3Id, Name: "AbsoluteFit Koramangala",   Locality: "Koramangala",  City: "Bengaluru",  Code: 6901),
            (Id: SeedGym4Id, Name: "AbsoluteFit Bandra",        Locality: "Bandra West",  City: "Mumbai",     Code: 7201),
            (Id: SeedGym5Id, Name: "AbsoluteFit Hitech City",   Locality: "Hitech City",  City: "Hyderabad",  Code: 7401),
        };

        foreach (var g in extraGyms)
        {
            if (await db.Gyms.AnyAsync(x => x.Id == g.Id)) continue;

            var gym = new Gym(
                name: g.Name,
                maxRooms: 3,
                subscriptionId: SeedSubscriptionId,
                id: g.Id,
                locality: g.Locality,
                city: g.City,
                branchCode: g.Code);

            await db.Gyms.AddAsync(gym);
            logger.LogInformation("Seeded gym: {Name}", g.Name);
        }

        await db.SaveChangesAsync();
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

    private static async Task SeedStaffAsync(
        AbsoluteFitManagementDbContext db, ILogger logger)
    {
        if (await db.Staff.AnyAsync(s => s.GymId == SeedGym1Id))
            return;

        var joinDate = new DateOnly(2022, 1, 1);

        var staffList = new[]
        {
            new StaffMember(SeedGym1Id, 44998, "Ayub Khan",  "9900000001", "Trainer",   joinDate, email: "absolutefitgym@gmail.com",     adminRights: "Training",     attendanceId: "S44998", isActive: true),
            new StaffMember(SeedGym1Id, 58227, "Chetan",     "9900000002", "Staff",     joinDate, email: "chetanabsolutefit@gmail.com",   adminRights: "Housekeeping", attendanceId: null,     isActive: false),
            new StaffMember(SeedGym1Id, 55628, "Dhirendar",  "9900000003", "Staff",     joinDate, email: "dhirendarabsfit@gmail.com",     adminRights: "Housekeeping", attendanceId: "S55628", isActive: true),
            new StaffMember(SeedGym1Id, 47571, "Dilip",      "9900000004", "Trainer",   joinDate, email: "dilip@absolutefit.in",          adminRights: "Training",     attendanceId: "S47571", isActive: true),
            new StaffMember(SeedGym1Id, 70874, "Dipin Joy",  "9900000005", "Trainer",   joinDate, email: "dipin@absolutefit.in",          adminRights: "Training",     attendanceId: "S70874", isActive: true),
            new StaffMember(SeedGym1Id, 50427, "KALPANA",    "9900000006", "Staff",     joinDate, email: "kalpanaabsolutefit@gmail.com",  adminRights: "Housekeeping", attendanceId: "S50427", isActive: false),
            new StaffMember(SeedGym1Id, 49102, "Mounesh",    "9900000007", "Staff",     joinDate, email: "mouneshabsolutefit@gmail.com",  adminRights: "Housekeeping", attendanceId: "S49102", isActive: true),
            new StaffMember(SeedGym1Id, 42592, "Nikhil",     "9900000008", "Sales",     joinDate, email: "nikhil@absolutefit.in",         adminRights: "Sales",        attendanceId: "S42592", isActive: true),
            new StaffMember(SeedGym1Id, 50826, "Raghu",      "9900000009", "Admin",     joinDate, email: "raghavendra.mca@gmail.com",     adminRights: "Master Admin", attendanceId: null,     isActive: false),
            new StaffMember(SeedGym1Id, 47566, "Ramesh S",   "9900000010", "Trainer",   joinDate, email: "rameshs@absolutefit.in",        adminRights: "Training",     attendanceId: "S47566", isActive: false),
            new StaffMember(SeedGym1Id, 60302, "Sathish",    "9900000011", "Trainer",   joinDate, email: "sathishabsolutefit@gmail.com",  adminRights: "Training",     attendanceId: "S60302", isActive: true),
        };

        await db.Staff.AddRangeAsync(staffList);
        await db.SaveChangesAsync();

        logger.LogInformation("Seeded {Count} staff members for gym Marathahalli.", staffList.Length);
    }

    private static async Task SeedFitnessProfileItemsAsync(
        AbsoluteFitManagementDbContext db, ILogger logger)
    {
        var gymIds = new[] { SeedGym1Id, SeedGym2Id, SeedGym3Id, SeedGym4Id, SeedGym5Id };

        var activityLevelNames = new[]
        {
            "I have never trained before",
            "1 day per week",
            "2 days per week",
            "4 days per week",
            "5 days per week",
            "6 days per week",
            "7 days per week",
        };

        var injuryConditionNames = new[]
        {
            "Asthma/COPD",
            "Back Pain",
            "Bone Fracture",
            "Carpal Tunnel",
            "Diabetes",
            "Digestive Disorder",
            "Dizziness/Vertigo",
            "Epilepsy",
            "Foot Pain",
            "Glaucoma",
            "Heart Disease/Condition",
            "Hernia/Diastasis Recti",
            "High Blood Pressure",
            "High Cholestrol",
            "Hip Pain",
            "Hip Replacement",
            "Injury Recent",
            "Joint Pain",
            "Knee Replacement",
            "Leg Pain",
            "Metabolic Disorders (thyroid,kidney,etc)",
            "Multiple Sclerosis",
            "Neck Pain/Disorder",
            "Osteopenia/Osteoporosis",
            "Pacemaker",
            "Parkinson's Disease",
            "Pregnancy",
            "Scoliosis",
            "Shoulder Pain/Condition",
            "Smoking",
            "Stroke",
            "Surgery",
        };

        var levelNames = new[]
        {
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert",
        };

        var divisionNames = new[]
        {
            "Open",
            "Amateur",
            "Elite",
            "Masters",
            "Junior",
        };

        var certificationNames = new[]
        {
            "CPT (Certified Personal Trainer)",
            "CSCS (Strength & Conditioning)",
            "Yoga Instructor",
            "Pilates Instructor",
            "Nutrition Coach",
            "CrossFit L1",
            "CrossFit L2",
        };

        foreach (var gymId in gymIds)
        {
            if (!await db.FitnessProfileItems.AnyAsync(f => f.GymId == gymId && f.Category == "ActivityLevel"))
            {
                var items = activityLevelNames
                    .Select((name, i) => new FitnessProfileItem(gymId, "ActivityLevel", name, i + 1))
                    .ToList();
                await db.FitnessProfileItems.AddRangeAsync(items);
                logger.LogInformation("Seeded {Count} ActivityLevel items for gym {GymId}.", items.Count, gymId);
            }

            if (!await db.FitnessProfileItems.AnyAsync(f => f.GymId == gymId && f.Category == "InjuryCondition"))
            {
                var items = injuryConditionNames
                    .Select((name, i) => new FitnessProfileItem(gymId, "InjuryCondition", name, i + 1))
                    .ToList();
                await db.FitnessProfileItems.AddRangeAsync(items);
                logger.LogInformation("Seeded {Count} InjuryCondition items for gym {GymId}.", items.Count, gymId);
            }

            if (!await db.FitnessProfileItems.AnyAsync(f => f.GymId == gymId && f.Category == "Level"))
            {
                var items = levelNames
                    .Select((name, i) => new FitnessProfileItem(gymId, "Level", name, i + 1))
                    .ToList();
                await db.FitnessProfileItems.AddRangeAsync(items);
                logger.LogInformation("Seeded {Count} Level items for gym {GymId}.", items.Count, gymId);
            }

            if (!await db.FitnessProfileItems.AnyAsync(f => f.GymId == gymId && f.Category == "Division"))
            {
                var items = divisionNames
                    .Select((name, i) => new FitnessProfileItem(gymId, "Division", name, i + 1))
                    .ToList();
                await db.FitnessProfileItems.AddRangeAsync(items);
                logger.LogInformation("Seeded {Count} Division items for gym {GymId}.", items.Count, gymId);
            }

            if (!await db.FitnessProfileItems.AnyAsync(f => f.GymId == gymId && f.Category == "Certification"))
            {
                var items = certificationNames
                    .Select((name, i) => new FitnessProfileItem(gymId, "Certification", name, i + 1))
                    .ToList();
                await db.FitnessProfileItems.AddRangeAsync(items);
                logger.LogInformation("Seeded {Count} Certification items for gym {GymId}.", items.Count, gymId);
            }
        }

        await db.SaveChangesAsync();
    }

    private static async Task SeedApparelItemsAsync(
        AbsoluteFitManagementDbContext db, ILogger logger)
    {
        var gymIds = new[] { SeedGym1Id, SeedGym2Id, SeedGym3Id, SeedGym4Id, SeedGym5Id };

        var tshirtSizes = new[] { "XS", "S", "M", "L", "XL", "XXL", "XXXL" };
        var shortsSizes = new[] { "XS", "S", "M", "L", "XL", "XXL", "XXXL" };
        var shoesSizes  = new[]
        {
            "UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12",
        };

        foreach (var gymId in gymIds)
        {
            if (!await db.ApparelItems.AnyAsync(a => a.GymId == gymId && a.Category == "TShirtSize"))
            {
                var items = tshirtSizes
                    .Select((name, i) => new ApparelItem(gymId, "TShirtSize", name, i + 1))
                    .ToList();
                await db.ApparelItems.AddRangeAsync(items);
                logger.LogInformation("Seeded {Count} TShirtSize items for gym {GymId}.", items.Count, gymId);
            }

            if (!await db.ApparelItems.AnyAsync(a => a.GymId == gymId && a.Category == "ShortsSize"))
            {
                var items = shortsSizes
                    .Select((name, i) => new ApparelItem(gymId, "ShortsSize", name, i + 1))
                    .ToList();
                await db.ApparelItems.AddRangeAsync(items);
                logger.LogInformation("Seeded {Count} ShortsSize items for gym {GymId}.", items.Count, gymId);
            }

            if (!await db.ApparelItems.AnyAsync(a => a.GymId == gymId && a.Category == "ShoesSize"))
            {
                var items = shoesSizes
                    .Select((name, i) => new ApparelItem(gymId, "ShoesSize", name, i + 1))
                    .ToList();
                await db.ApparelItems.AddRangeAsync(items);
                logger.LogInformation("Seeded {Count} ShoesSize items for gym {GymId}.", items.Count, gymId);
            }
        }

        await db.SaveChangesAsync();
    }
}
