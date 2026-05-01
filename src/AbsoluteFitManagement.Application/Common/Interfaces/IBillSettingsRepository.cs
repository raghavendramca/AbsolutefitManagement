using BillSettingsEntity = AbsoluteFitManagement.Domain.Setup.BillSettings;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IBillSettingsRepository
{
    Task<BillSettingsEntity?> GetByGymAndKeyAsync(Guid gymId, string settingKey);
    Task AddAsync(BillSettingsEntity settings);
    Task UpdateAsync(BillSettingsEntity settings);
}
