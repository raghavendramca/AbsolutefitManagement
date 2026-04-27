using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Queries.ListServiceVariations;

public class ListServiceVariationsQueryHandler : IRequestHandler<ListServiceVariationsQuery, ErrorOr<List<ServiceVariation>>>
{
    private readonly IGymServicesRepository _repository;

    public ListServiceVariationsQueryHandler(IGymServicesRepository repository)
    {
        _repository = repository;
    }

    public async Task<ErrorOr<List<ServiceVariation>>> Handle(ListServiceVariationsQuery request, CancellationToken cancellationToken)
    {
        var variations = await _repository.ListVariationsByServiceIdAsync(request.ServiceId);
        return variations;
    }
}
