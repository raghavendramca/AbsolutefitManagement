using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Commands.ToggleApparelItem;

public class ToggleApparelItemCommandHandler : IRequestHandler<ToggleApparelItemCommand, ErrorOr<ApparelItem>>
{
    private readonly IApparelItemRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public ToggleApparelItemCommandHandler(IApparelItemRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<ApparelItem>> Handle(ToggleApparelItemCommand request, CancellationToken cancellationToken)
    {
        var item = await _repository.GetByIdAsync(request.Id);
        if (item is null) return Error.NotFound(description: "Item not found");

        item.Toggle();
        await _repository.UpdateAsync(item);
        await _unitOfWork.CommitChangesAsync();
        return item;
    }
}
