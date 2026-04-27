using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using MediatR;
using FormCustomizationEntity = AbsoluteFitManagement.Domain.Setup.FormCustomization;

namespace AbsoluteFitManagement.Application.FormCustomization.Commands.UpsertFormCustomization;

public class UpsertFormCustomizationCommandHandler : IRequestHandler<UpsertFormCustomizationCommand, ErrorOr<FormCustomizationEntity>>
{
    private readonly IFormCustomizationRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UpsertFormCustomizationCommandHandler(IFormCustomizationRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<FormCustomizationEntity>> Handle(UpsertFormCustomizationCommand request, CancellationToken cancellationToken)
    {
        var config = await _repository.GetByGymIdAndFormTypeAsync(request.GymId, request.FormType);
        bool isNew = config is null;
        config ??= new FormCustomizationEntity(request.GymId, request.FormType);

        config.Update(request.FieldsJson);

        if (isNew)
            await _repository.AddAsync(config);
        else
            await _repository.UpdateAsync(config);

        await _unitOfWork.CommitChangesAsync();
        return config;
    }
}
