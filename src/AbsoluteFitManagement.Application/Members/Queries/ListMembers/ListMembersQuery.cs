using ErrorOr;
using AbsoluteFitManagement.Domain.Members;
using MediatR;

namespace AbsoluteFitManagement.Application.Members.Queries.ListMembers;

public record ListMembersQuery(Guid GymId) : IRequest<ErrorOr<List<Member>>>;
