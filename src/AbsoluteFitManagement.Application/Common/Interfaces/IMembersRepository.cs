using AbsoluteFitManagement.Domain.Members;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IMembersRepository
{
    Task<List<Member>> ListByGymIdAsync(Guid gymId);
    Task<Member?> GetByIdAsync(Guid memberId);
    Task AddAsync(Member member);
}
