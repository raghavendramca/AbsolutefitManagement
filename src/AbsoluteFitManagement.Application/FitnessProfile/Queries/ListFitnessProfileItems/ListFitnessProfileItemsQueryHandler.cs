using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.FitnessProfile.Queries.ListFitnessProfileItems;

public class ListFitnessProfileItemsQueryHandler : IRequestHandler<ListFitnessProfileItemsQuery, ErrorOr<List<FitnessProfileItem>>>
{
    private readonly IFitnessProfileItemRepository _repository;
    private readonly IGymsRepository _gymsRepository;

    public ListFitnessProfileItemsQueryHandler(IFitnessProfileItemRepository repository, IGymsRepository gymsRepository)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
    }

    public async Task<ErrorOr<List<FitnessProfileItem>>> Handle(ListFitnessProfileItemsQuery request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        var items = await _repository.ListByCategoryAsync(request.GymId, request.Category);
        return items;
    }
}
