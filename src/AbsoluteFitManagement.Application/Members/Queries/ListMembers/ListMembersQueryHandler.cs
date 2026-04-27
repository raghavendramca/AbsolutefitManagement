using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Members;
using MediatR;

namespace AbsoluteFitManagement.Application.Members.Queries.ListMembers;

public class ListMembersQueryHandler : IRequestHandler<ListMembersQuery, ErrorOr<List<Member>>>
{
    private readonly IMembersRepository _repository;

    public ListMembersQueryHandler(IMembersRepository repository)
    {
        _repository = repository;
    }

    public async Task<ErrorOr<List<Member>>> Handle(ListMembersQuery request, CancellationToken cancellationToken)
    {
        var members = await _repository.ListByGymIdAsync(request.GymId);
        return members;
    }
}
