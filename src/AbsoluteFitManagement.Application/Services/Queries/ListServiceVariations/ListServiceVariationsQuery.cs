using ErrorOr;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Queries.ListServiceVariations;

public record ListServiceVariationsQuery(Guid ServiceId) : IRequest<ErrorOr<List<ServiceVariation>>>;
