using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class ApparelItemRepository : IApparelItemRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public ApparelItemRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<List<ApparelItem>> ListByCategoryAsync(Guid gymId, string category) =>
        await _db.ApparelItems
            .Where(x => x.GymId == gymId && x.Category == category)
            .OrderBy(x => x.SortOrder)
            .ToListAsync();

    public async Task<ApparelItem?> GetByIdAsync(Guid id) =>
        await _db.ApparelItems.FindAsync(id);

    public async Task<int> CountByCategoryAsync(Guid gymId, string category) =>
        await _db.ApparelItems.CountAsync(x => x.GymId == gymId && x.Category == category);

    public async Task AddAsync(ApparelItem item) =>
        await _db.ApparelItems.AddAsync(item);

    public Task UpdateAsync(ApparelItem item)
    {
        _db.ApparelItems.Update(item);
        return Task.CompletedTask;
    }
}
