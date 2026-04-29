using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Commands.UpdateApparelItem;

public class UpdateApparelItemCommandHandler : IRequestHandler<UpdateApparelItemCommand, ErrorOr<ApparelItem>>
{
    private readonly IApparelItemRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateApparelItemCommandHandler(IApparelItemRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<ApparelItem>> Handle(UpdateApparelItemCommand request, CancellationToken cancellationToken)
    {
        var item = await _repository.GetByIdAsync(request.Id);
        if (item is null) return Error.NotFound(description: "Item not found");

        item.UpdateName(request.Name);
        await _repository.UpdateAsync(item);
        await _unitOfWork.CommitChangesAsync();
        return item;
    }
}
