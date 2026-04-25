using ErrorOr;
using AbsoluteFitManagement.Domain.Gyms;
using MediatR;

namespace AbsoluteFitManagement.Application.Branches.Queries.ListBranches;

public record ListBranchesQuery(Guid TenantId) : IRequest<ErrorOr<List<Gym>>>;
