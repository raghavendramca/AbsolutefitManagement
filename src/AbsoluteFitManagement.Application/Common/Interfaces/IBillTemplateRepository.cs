using AbsoluteFitManagement.Domain.Setup;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IBillTemplateRepository
{
    Task<List<BillTemplate>> ListByGymAsync(Guid gymId);
    Task<BillTemplate?> GetByIdAsync(Guid id);
    Task AddAsync(BillTemplate template);
    Task UpdateAsync(BillTemplate template);
}
