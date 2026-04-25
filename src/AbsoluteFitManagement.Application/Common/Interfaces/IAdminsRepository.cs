using AbsoluteFitManagement.Domain.Admins;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IAdminsRepository
{
    Task<Admin?> GetByIdAsync(Guid id);
    Task UpdateAsync(Admin admin);
}