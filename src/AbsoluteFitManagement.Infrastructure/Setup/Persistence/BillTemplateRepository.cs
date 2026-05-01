using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class BillTemplateRepository : IBillTemplateRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public BillTemplateRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<List<BillTemplate>> ListByGymAsync(Guid gymId) =>
        await _db.BillTemplates
            .Where(x => x.GymId == gymId)
            .OrderByDescending(x => x.IsActive)
            .ToListAsync();

    public async Task<BillTemplate?> GetByIdAsync(Guid id) =>
        await _db.BillTemplates.FindAsync(id);

    public async Task AddAsync(BillTemplate template) =>
        await _db.BillTemplates.AddAsync(template);

    public Task UpdateAsync(BillTemplate template)
    {
        _db.BillTemplates.Update(template);
        return Task.CompletedTask;
    }
}
