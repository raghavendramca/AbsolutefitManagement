using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class GymProfileRepository : IGymProfileRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public GymProfileRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<GymProfile?> GetByGymIdAsync(Guid gymId) =>
        await _db.GymProfiles.AsNoTracking().FirstOrDefaultAsync(p => p.GymId == gymId);

    public async Task AddAsync(GymProfile profile) => await _db.GymProfiles.AddAsync(profile);

    public Task UpdateAsync(GymProfile profile)
    {
        _db.GymProfiles.Update(profile);
        return Task.CompletedTask;
    }
}
