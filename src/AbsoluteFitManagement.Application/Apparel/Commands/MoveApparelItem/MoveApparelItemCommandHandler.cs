using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Commands.MoveApparelItem;

public class MoveApparelItemCommandHandler : IRequestHandler<MoveApparelItemCommand, ErrorOr<List<ApparelItem>>>
{
    private readonly IApparelItemRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public MoveApparelItemCommandHandler(IApparelItemRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<List<ApparelItem>>> Handle(MoveApparelItemCommand request, CancellationToken cancellationToken)
    {
        var items = await _repository.ListByCategoryAsync(request.GymId, request.Category);
        var idx = items.FindIndex(i => i.Id == request.ItemId);
        if (idx < 0) return Error.NotFound(description: "Item not found");

        var swapIdx = request.MoveUp ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= items.Count) return items;

        var aOrder = items[idx].SortOrder;
        var bOrder = items[swapIdx].SortOrder;
        items[idx].UpdateSortOrder(bOrder);
        items[swapIdx].UpdateSortOrder(aOrder);

        await _repository.UpdateAsync(items[idx]);
        await _repository.UpdateAsync(items[swapIdx]);
        await _unitOfWork.CommitChangesAsync();

        items.Sort((a, b) => a.SortOrder.CompareTo(b.SortOrder));
        return items;
    }
}
