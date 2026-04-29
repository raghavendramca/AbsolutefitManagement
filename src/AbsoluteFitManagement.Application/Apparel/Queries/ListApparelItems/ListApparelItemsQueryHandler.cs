using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Queries.ListApparelItems;

public class ListApparelItemsQueryHandler : IRequestHandler<ListApparelItemsQuery, ErrorOr<List<ApparelItem>>>
{
    private readonly IApparelItemRepository _repository;
    private readonly IGymsRepository _gymsRepository;

    public ListApparelItemsQueryHandler(IApparelItemRepository repository, IGymsRepository gymsRepository)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
    }

    public async Task<ErrorOr<List<ApparelItem>>> Handle(ListApparelItemsQuery request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        return await _repository.ListByCategoryAsync(request.GymId, request.Category);
    }
}
