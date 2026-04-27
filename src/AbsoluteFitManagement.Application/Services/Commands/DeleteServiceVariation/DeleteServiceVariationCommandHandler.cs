using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.DeleteServiceVariation;

public class DeleteServiceVariationCommandHandler : IRequestHandler<DeleteServiceVariationCommand, ErrorOr<Deleted>>
{
    private readonly IGymServicesRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteServiceVariationCommandHandler(IGymServicesRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<Deleted>> Handle(DeleteServiceVariationCommand request, CancellationToken cancellationToken)
    {
        var variation = await _repository.GetVariationByIdAsync(request.VariationId);
        if (variation is null || variation.ServiceId != request.ServiceId)
            return Error.NotFound(description: "Variation not found");

        _repository.RemoveVariation(variation);
        await _unitOfWork.CommitChangesAsync();
        return Result.Deleted;
    }
}
