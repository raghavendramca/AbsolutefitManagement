using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using BillSettingsEntity = AbsoluteFitManagement.Domain.Setup.BillSettings;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class BillSettingsRepository : IBillSettingsRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public BillSettingsRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<BillSettingsEntity?> GetByGymAndKeyAsync(Guid gymId, string settingKey) =>
        await _db.BillSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.GymId == gymId && x.SettingKey == settingKey);

    public async Task AddAsync(BillSettingsEntity settings) =>
        await _db.BillSettings.AddAsync(settings);

    public Task UpdateAsync(BillSettingsEntity settings)
    {
        _db.BillSettings.Update(settings);
        return Task.CompletedTask;
    }
}
