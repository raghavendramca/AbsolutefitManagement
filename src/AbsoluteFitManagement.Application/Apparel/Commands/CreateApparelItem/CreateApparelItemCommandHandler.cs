using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Commands.CreateApparelItem;

public class CreateApparelItemCommandHandler : IRequestHandler<CreateApparelItemCommand, ErrorOr<ApparelItem>>
{
    private readonly IApparelItemRepository _repository;
    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateApparelItemCommandHandler(
        IApparelItemRepository repository,
        IGymsRepository gymsRepository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<ApparelItem>> Handle(CreateApparelItemCommand request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        var count = await _repository.CountByCategoryAsync(request.GymId, request.Category);
        var item = new ApparelItem(request.GymId, request.Category, request.Name, count + 1);

        await _repository.AddAsync(item);
        await _unitOfWork.CommitChangesAsync();
        return item;
    }
}
