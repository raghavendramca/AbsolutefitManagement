using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.BillTemplates.Commands.CreateBillTemplate;

public class CreateBillTemplateCommandHandler : IRequestHandler<CreateBillTemplateCommand, ErrorOr<BillTemplate>>
{
    private readonly IBillTemplateRepository _repository;
    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateBillTemplateCommandHandler(
        IBillTemplateRepository repository,
        IGymsRepository gymsRepository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<BillTemplate>> Handle(CreateBillTemplateCommand request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        var template = new BillTemplate(request.GymId, request.State, request.GstNumber, request.BusinessName, request.TemplateJson);
        await _repository.AddAsync(template);
        await _unitOfWork.CommitChangesAsync();
        return template;
    }
}
