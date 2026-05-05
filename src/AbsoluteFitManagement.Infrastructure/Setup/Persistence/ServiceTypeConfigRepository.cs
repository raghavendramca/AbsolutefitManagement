using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class ServiceTypeConfigRepository : IServiceTypeConfigRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public ServiceTypeConfigRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<List<ServiceTypeConfig>> ListOrderedAsync() =>
        await _db.ServiceTypeConfigs
            .OrderBy(c => c.SortOrder)
            .AsNoTracking()
            .ToListAsync();
}
