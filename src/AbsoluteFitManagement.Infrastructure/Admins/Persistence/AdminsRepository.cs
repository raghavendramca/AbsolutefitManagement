using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Admins;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Admins.Persistence;

public class AdminsRepository : IAdminsRepository
{
    private readonly AbsoluteFitManagementDbContext _dbContext;

    public AdminsRepository(AbsoluteFitManagementDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<Admin?> GetByIdAsync(Guid id)
    {
        return _dbContext.Admins.FirstOrDefaultAsync(a => a.Id == id);
    }

    public Task UpdateAsync(Admin admin)
    {
        _dbContext.Admins.Update(admin);
        return Task.CompletedTask;
    }
}