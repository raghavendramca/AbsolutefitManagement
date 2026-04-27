using AbsoluteFitManagement.Domain.Services;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IGymServicesRepository
{
    Task AddAsync(GymService service);
    Task<List<GymService>> ListByGymIdAsync(Guid gymId);
    Task<List<(GymService Service, int VariationCount)>> ListByGymIdWithCountsAsync(Guid gymId);
    Task<GymService?> GetByIdAsync(Guid id);
    void Remove(GymService service);
    Task AddVariationAsync(ServiceVariation variation);
    Task<List<ServiceVariation>> ListVariationsByServiceIdAsync(Guid serviceId);
    Task<ServiceVariation?> GetVariationByIdAsync(Guid id);
    void RemoveVariation(ServiceVariation variation);
    Task<int> CountVariationsByServiceIdAsync(Guid serviceId);
}
