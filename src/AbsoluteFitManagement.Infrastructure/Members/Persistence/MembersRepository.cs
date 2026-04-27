using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Members;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Members.Persistence;

public class MembersRepository : IMembersRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public MembersRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<List<Member>> ListByGymIdAsync(Guid gymId) =>
        await _db.Members.AsNoTracking()
            .Where(m => m.GymId == gymId)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

    public async Task AddAsync(Member member) => await _db.Members.AddAsync(member);
}
