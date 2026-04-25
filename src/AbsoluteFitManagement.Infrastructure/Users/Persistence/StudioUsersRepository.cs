using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Users;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Users.Persistence;

public class StudioUsersRepository : IStudioUsersRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public StudioUsersRepository(AbsoluteFitManagementDbContext db)
    {
        _db = db;
    }

    public async Task<StudioUser?> GetByEmailAsync(string email) =>
        await _db.StudioUsers.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email.ToLowerInvariant());

    public async Task AddAsync(StudioUser user)
    {
        await _db.StudioUsers.AddAsync(user);
    }

    public async Task<bool> ExistsAsync(string email) =>
        await _db.StudioUsers.AnyAsync(u => u.Email == email.ToLowerInvariant());
}
