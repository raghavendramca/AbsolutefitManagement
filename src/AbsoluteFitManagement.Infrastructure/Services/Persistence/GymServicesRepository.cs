using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Services;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Services.Persistence;

public class GymServicesRepository : IGymServicesRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public GymServicesRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task AddAsync(GymService service) => await _db.GymServices.AddAsync(service);

    public async Task<List<GymService>> ListByGymIdAsync(Guid gymId) =>
        await _db.GymServices
            .AsNoTracking()
            .Where(s => s.GymId == gymId)
            .OrderBy(s => s.Name)
            .ToListAsync();

    public async Task<List<(GymService Service, int VariationCount)>> ListByGymIdWithCountsAsync(Guid gymId)
    {
        var services = await _db.GymServices
            .AsNoTracking()
            .Where(s => s.GymId == gymId)
            .OrderBy(s => s.Name)
            .ToListAsync();

        var serviceIds = services.Select(s => s.Id).ToList();

        var counts = await _db.ServiceVariations
            .AsNoTracking()
            .Where(v => serviceIds.Contains(v.ServiceId))
            .GroupBy(v => v.ServiceId)
            .Select(g => new { ServiceId = g.Key, Count = g.Count() })
            .ToListAsync();

        var countMap = counts.ToDictionary(c => c.ServiceId, c => c.Count);

        return services
            .Select(s => (s, countMap.TryGetValue(s.Id, out var c) ? c : 0))
            .ToList();
    }

    public async Task<GymService?> GetByIdAsync(Guid id) =>
        await _db.GymServices.FirstOrDefaultAsync(s => s.Id == id);

    public void Remove(GymService service) => _db.GymServices.Remove(service);

    public async Task AddVariationAsync(ServiceVariation variation) =>
        await _db.ServiceVariations.AddAsync(variation);

    public async Task<List<ServiceVariation>> ListVariationsByServiceIdAsync(Guid serviceId) =>
        await _db.ServiceVariations
            .AsNoTracking()
            .Where(v => v.ServiceId == serviceId)
            .OrderBy(v => v.Name)
            .ToListAsync();

    public async Task<ServiceVariation?> GetVariationByIdAsync(Guid id) =>
        await _db.ServiceVariations.FirstOrDefaultAsync(v => v.Id == id);

    public void RemoveVariation(ServiceVariation variation) => _db.ServiceVariations.Remove(variation);

    public async Task<int> CountVariationsByServiceIdAsync(Guid serviceId) =>
        await _db.ServiceVariations.CountAsync(v => v.ServiceId == serviceId);
}
