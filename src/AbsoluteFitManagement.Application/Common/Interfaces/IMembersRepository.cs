using AbsoluteFitManagement.Domain.Members;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IMembersRepository
{
    Task<List<Member>> ListByGymIdAsync(Guid gymId);
    Task AddAsync(Member member);
}
