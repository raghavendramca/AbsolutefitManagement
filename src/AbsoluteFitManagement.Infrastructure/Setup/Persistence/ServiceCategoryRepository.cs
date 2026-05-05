using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class ServiceCategoryRepository : IServiceCategoryRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public ServiceCategoryRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<List<ServiceCategory>> ListActiveWithActivitiesAsync() =>
        await _db.ServiceCategories
            .Where(c => c.IsActive)
            .Include(c => c.Activities.Where(a => a.IsActive).OrderBy(a => a.SortOrder))
            .OrderBy(c => c.SortOrder)
            .ToListAsync();
}
