using ErrorOr;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Queries.ListGymServices;

public record ListGymServicesQuery(Guid GymId) : IRequest<ErrorOr<List<GymService>>>;
