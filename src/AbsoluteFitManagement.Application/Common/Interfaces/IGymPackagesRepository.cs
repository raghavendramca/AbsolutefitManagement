using AbsoluteFitManagement.Domain.Packages;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IGymPackagesRepository
{
    Task AddAsync(GymPackage package);
    Task<List<GymPackage>> ListByGymIdAsync(Guid gymId);
}
