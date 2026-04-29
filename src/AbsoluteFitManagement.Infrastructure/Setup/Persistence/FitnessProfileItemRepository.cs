using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class FitnessProfileItemRepository : IFitnessProfileItemRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public FitnessProfileItemRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<List<FitnessProfileItem>> ListByCategoryAsync(Guid gymId, string category) =>
        await _db.FitnessProfileItems
            .Where(x => x.GymId == gymId && x.Category == category)
            .OrderBy(x => x.SortOrder)
            .ToListAsync();

    public async Task<FitnessProfileItem?> GetByIdAsync(Guid id) =>
        await _db.FitnessProfileItems.FindAsync(id);

    public async Task<int> CountByCategoryAsync(Guid gymId, string category) =>
        await _db.FitnessProfileItems.CountAsync(x => x.GymId == gymId && x.Category == category);

    public async Task AddAsync(FitnessProfileItem item) =>
        await _db.FitnessProfileItems.AddAsync(item);

    public Task UpdateAsync(FitnessProfileItem item)
    {
        _db.FitnessProfileItems.Update(item);
        return Task.CompletedTask;
    }
}
