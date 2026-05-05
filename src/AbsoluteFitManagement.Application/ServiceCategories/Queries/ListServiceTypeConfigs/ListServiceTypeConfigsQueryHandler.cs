using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.ServiceCategories.Queries.ListServiceTypeConfigs;

public class ListServiceTypeConfigsQueryHandler
    : IRequestHandler<ListServiceTypeConfigsQuery, ErrorOr<List<ServiceTypeConfig>>>
{
    private readonly IServiceTypeConfigRepository _repository;

    public ListServiceTypeConfigsQueryHandler(IServiceTypeConfigRepository repository)
        => _repository = repository;

    public async Task<ErrorOr<List<ServiceTypeConfig>>> Handle(
        ListServiceTypeConfigsQuery request,
        CancellationToken cancellationToken)
        => await _repository.ListOrderedAsync();
}
