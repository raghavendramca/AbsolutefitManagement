using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.FitnessProfile.Commands.CreateFitnessProfileItem;

public class CreateFitnessProfileItemCommandHandler : IRequestHandler<CreateFitnessProfileItemCommand, ErrorOr<FitnessProfileItem>>
{
    private readonly IFitnessProfileItemRepository _repository;
    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateFitnessProfileItemCommandHandler(
        IFitnessProfileItemRepository repository,
        IGymsRepository gymsRepository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<FitnessProfileItem>> Handle(CreateFitnessProfileItemCommand request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        var count = await _repository.CountByCategoryAsync(request.GymId, request.Category);
        var item = new FitnessProfileItem(request.GymId, request.Category, request.Name, count + 1);

        await _repository.AddAsync(item);
        await _unitOfWork.CommitChangesAsync();
        return item;
    }
}
