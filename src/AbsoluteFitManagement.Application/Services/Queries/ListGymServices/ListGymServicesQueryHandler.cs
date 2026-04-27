using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Queries.ListGymServices;

public class ListGymServicesQueryHandler : IRequestHandler<ListGymServicesQuery, ErrorOr<List<GymService>>>
{
    private readonly IGymServicesRepository _repository;

    public ListGymServicesQueryHandler(IGymServicesRepository repository)
    {
        _repository = repository;
    }

    public async Task<ErrorOr<List<GymService>>> Handle(ListGymServicesQuery request, CancellationToken cancellationToken)
    {
        var services = await _repository.ListByGymIdAsync(request.GymId);
        return services;
    }
}
