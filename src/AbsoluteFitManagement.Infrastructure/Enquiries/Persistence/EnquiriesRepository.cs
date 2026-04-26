using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Enquiries;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Enquiries.Persistence;

public class EnquiriesRepository : IEnquiriesRepository
{
    private readonly AbsoluteFitManagementDbContext _dbContext;

    public EnquiriesRepository(AbsoluteFitManagementDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Enquiry enquiry)
    {
        await _dbContext.Enquiries.AddAsync(enquiry);
    }

    public async Task<List<Enquiry>> ListByGymIdAsync(Guid gymId)
    {
        return await _dbContext.Enquiries
            .AsNoTracking()
            .Where(e => e.GymId == gymId)
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync();
    }

    public async Task<Enquiry?> GetByIdAsync(Guid id)
    {
        return await _dbContext.Enquiries.FirstOrDefaultAsync(e => e.Id == id);
    }
}
