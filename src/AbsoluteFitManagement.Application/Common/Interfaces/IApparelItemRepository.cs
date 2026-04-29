using AbsoluteFitManagement.Domain.Setup;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IApparelItemRepository
{
    Task<List<ApparelItem>> ListByCategoryAsync(Guid gymId, string category);
    Task<ApparelItem?> GetByIdAsync(Guid id);
    Task<int> CountByCategoryAsync(Guid gymId, string category);
    Task AddAsync(ApparelItem item);
    Task UpdateAsync(ApparelItem item);
}
