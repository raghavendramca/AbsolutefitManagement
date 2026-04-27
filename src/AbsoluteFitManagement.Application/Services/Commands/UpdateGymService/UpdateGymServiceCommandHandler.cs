using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.UpdateGymService;

public class UpdateGymServiceCommandHandler : IRequestHandler<UpdateGymServiceCommand, ErrorOr<GymService>>
{
    private readonly IGymServicesRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateGymServiceCommandHandler(IGymServicesRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<GymService>> Handle(UpdateGymServiceCommand request, CancellationToken cancellationToken)
    {
        var service = await _repository.GetByIdAsync(request.ServiceId);
        if (service is null || service.GymId != request.GymId)
            return Error.NotFound(description: "Service not found");

        service.Update(request.Name, request.Description, request.CategoryType, request.SacCode, request.Tax);
        service.SetActive(request.IsActive);

        await _unitOfWork.CommitChangesAsync();
        return service;
    }
}
