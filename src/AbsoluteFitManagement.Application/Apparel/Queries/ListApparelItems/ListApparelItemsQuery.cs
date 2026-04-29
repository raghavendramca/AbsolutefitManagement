using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Queries.ListApparelItems;

public record ListApparelItemsQuery(Guid GymId, string Category) : IRequest<ErrorOr<List<ApparelItem>>>;
