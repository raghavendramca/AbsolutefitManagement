using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class FormCustomizationRepository : IFormCustomizationRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public FormCustomizationRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<FormCustomization?> GetByGymIdAndFormTypeAsync(Guid gymId, string formType) =>
        await _db.FormCustomizations
            .AsNoTracking()
            .FirstOrDefaultAsync(f => f.GymId == gymId && f.FormType == formType);

    public async Task AddAsync(FormCustomization config) => await _db.FormCustomizations.AddAsync(config);

    public Task UpdateAsync(FormCustomization config)
    {
        _db.FormCustomizations.Update(config);
        return Task.CompletedTask;
    }
}
