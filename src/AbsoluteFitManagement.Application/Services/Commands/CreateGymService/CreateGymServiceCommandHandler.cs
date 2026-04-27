using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.CreateGymService;

public class CreateGymServiceCommandHandler : IRequestHandler<CreateGymServiceCommand, ErrorOr<GymService>>
{
    private readonly IGymServicesRepository _repository;
    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateGymServiceCommandHandler(
        IGymServicesRepository repository,
        IGymsRepository gymsRepository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<GymService>> Handle(CreateGymServiceCommand request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        var service = new GymService(request.GymId, request.Name, request.Description, request.CategoryType, request.SacCode, request.Tax);
        await _repository.AddAsync(service);
        await _unitOfWork.CommitChangesAsync();
        return service;
    }
}
