using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.FitnessProfile.Queries.ListFitnessProfileItems;

public record ListFitnessProfileItemsQuery(Guid GymId, string Category) : IRequest<ErrorOr<List<FitnessProfileItem>>>;
