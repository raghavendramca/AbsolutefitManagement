using AbsoluteFitManagement.Domain.Setup;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IFitnessProfileItemRepository
{
    Task<List<FitnessProfileItem>> ListByCategoryAsync(Guid gymId, string category);
    Task<FitnessProfileItem?> GetByIdAsync(Guid id);
    Task<int> CountByCategoryAsync(Guid gymId, string category);
    Task AddAsync(FitnessProfileItem item);
    Task UpdateAsync(FitnessProfileItem item);
}
