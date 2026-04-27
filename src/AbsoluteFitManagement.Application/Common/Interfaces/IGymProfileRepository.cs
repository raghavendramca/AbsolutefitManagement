using AbsoluteFitManagement.Domain.Setup;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IGymProfileRepository
{
    Task<GymProfile?> GetByGymIdAsync(Guid gymId);
    Task AddAsync(GymProfile profile);
    Task UpdateAsync(GymProfile profile);
}
