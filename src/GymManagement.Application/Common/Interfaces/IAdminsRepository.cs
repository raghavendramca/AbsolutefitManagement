using GymManagement.Domain.Admins;

namespace GymManagement.Application.Common.Interfaces;

public interface IAdminsRepository
{
    Task<Admin?> GetByIdAsync(Guid id);
    Task UpdateAsync(Admin admin);
}