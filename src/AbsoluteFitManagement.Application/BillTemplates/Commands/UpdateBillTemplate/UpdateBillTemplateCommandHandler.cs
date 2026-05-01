using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.BillTemplates.Commands.UpdateBillTemplate;

public class UpdateBillTemplateCommandHandler : IRequestHandler<UpdateBillTemplateCommand, ErrorOr<BillTemplate>>
{
    private readonly IBillTemplateRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateBillTemplateCommandHandler(IBillTemplateRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<BillTemplate>> Handle(UpdateBillTemplateCommand request, CancellationToken cancellationToken)
    {
        var template = await _repository.GetByIdAsync(request.Id);
        if (template is null)
            return Error.NotFound(description: "Bill template not found");

        template.Update(request.State, request.GstNumber, request.BusinessName, request.TemplateJson);
        await _repository.UpdateAsync(template);
        await _unitOfWork.CommitChangesAsync();
        return template;
    }
}
