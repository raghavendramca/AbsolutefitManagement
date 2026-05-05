using AbsoluteFitManagement.Domain.Packages;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IGymPackagesRepository
{
    Task AddAsync(GymPackage package);
    Task<List<GymPackage>> ListByGymIdAsync(Guid gymId);
    Task<GymPackage?> GetByIdAsync(Guid id);
    Task DeleteAsync(GymPackage package);
}
