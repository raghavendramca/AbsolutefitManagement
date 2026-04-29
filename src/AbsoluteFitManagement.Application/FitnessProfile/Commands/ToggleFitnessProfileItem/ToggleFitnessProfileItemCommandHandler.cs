using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.FitnessProfile.Commands.ToggleFitnessProfileItem;

public class ToggleFitnessProfileItemCommandHandler : IRequestHandler<ToggleFitnessProfileItemCommand, ErrorOr<FitnessProfileItem>>
{
    private readonly IFitnessProfileItemRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public ToggleFitnessProfileItemCommandHandler(IFitnessProfileItemRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<FitnessProfileItem>> Handle(ToggleFitnessProfileItemCommand request, CancellationToken cancellationToken)
    {
        var item = await _repository.GetByIdAsync(request.Id);
        if (item is null) return Error.NotFound(description: "Item not found");

        item.Toggle();
        await _repository.UpdateAsync(item);
        await _unitOfWork.CommitChangesAsync();
        return item;
    }
}
