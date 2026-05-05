using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.ServiceCategories.Queries.ListServiceTypeConfigs;

public record ListServiceTypeConfigsQuery : IRequest<ErrorOr<List<ServiceTypeConfig>>>;
