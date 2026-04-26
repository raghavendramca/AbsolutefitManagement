using AbsoluteFitManagement.Domain.Enquiries;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IEnquiriesRepository
{
    Task AddAsync(Enquiry enquiry);
    Task<List<Enquiry>> ListByGymIdAsync(Guid gymId);
    Task<Enquiry?> GetByIdAsync(Guid id);
}
