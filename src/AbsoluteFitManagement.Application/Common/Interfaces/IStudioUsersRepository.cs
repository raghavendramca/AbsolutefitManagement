using AbsoluteFitManagement.Domain.Users;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IStudioUsersRepository
{
    Task<StudioUser?> GetByEmailAsync(string email);
    Task AddAsync(StudioUser user);
    Task<bool> ExistsAsync(string email);
}
