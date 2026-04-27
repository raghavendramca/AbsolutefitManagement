using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.DeleteGymService;

public class DeleteGymServiceCommandHandler : IRequestHandler<DeleteGymServiceCommand, ErrorOr<Deleted>>
{
    private readonly IGymServicesRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteGymServiceCommandHandler(IGymServicesRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<Deleted>> Handle(DeleteGymServiceCommand request, CancellationToken cancellationToken)
    {
        var service = await _repository.GetByIdAsync(request.ServiceId);
        if (service is null || service.GymId != request.GymId)
            return Error.NotFound(description: "Service not found");

        _repository.Remove(service);
        await _unitOfWork.CommitChangesAsync();
        return Result.Deleted;
    }
}
