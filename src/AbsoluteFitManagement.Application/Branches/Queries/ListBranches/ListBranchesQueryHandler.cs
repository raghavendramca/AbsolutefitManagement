using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Gyms;
using MediatR;

namespace AbsoluteFitManagement.Application.Branches.Queries.ListBranches;

public class ListBranchesQueryHandler : IRequestHandler<ListBranchesQuery, ErrorOr<List<Gym>>>
{
    private readonly IGymsRepository _gymsRepository;

    public ListBranchesQueryHandler(IGymsRepository gymsRepository)
    {
        _gymsRepository = gymsRepository;
    }

    public async Task<ErrorOr<List<Gym>>> Handle(ListBranchesQuery request, CancellationToken cancellationToken)
    {
        // TenantId == SubscriptionId in this shared-DB model
        var branches = await _gymsRepository.ListBySubscriptionIdAsync(request.TenantId);
        return branches;
    }
}
