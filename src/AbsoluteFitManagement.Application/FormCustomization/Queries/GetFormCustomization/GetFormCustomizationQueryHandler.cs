using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using MediatR;
using FormCustomizationEntity = AbsoluteFitManagement.Domain.Setup.FormCustomization;

namespace AbsoluteFitManagement.Application.FormCustomization.Queries.GetFormCustomization;

public class GetFormCustomizationQueryHandler : IRequestHandler<GetFormCustomizationQuery, ErrorOr<FormCustomizationEntity>>
{
    private readonly IFormCustomizationRepository _repository;

    public GetFormCustomizationQueryHandler(IFormCustomizationRepository repository)
    {
        _repository = repository;
    }

    public async Task<ErrorOr<FormCustomizationEntity>> Handle(GetFormCustomizationQuery request, CancellationToken cancellationToken)
    {
        var config = await _repository.GetByGymIdAndFormTypeAsync(request.GymId, request.FormType);
        return config ?? new FormCustomizationEntity(request.GymId, request.FormType);
    }
}
