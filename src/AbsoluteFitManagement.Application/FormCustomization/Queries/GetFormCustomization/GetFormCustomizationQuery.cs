using ErrorOr;
using MediatR;
using FormCustomizationEntity = AbsoluteFitManagement.Domain.Setup.FormCustomization;

namespace AbsoluteFitManagement.Application.FormCustomization.Queries.GetFormCustomization;

public record GetFormCustomizationQuery(Guid GymId, string FormType) : IRequest<ErrorOr<FormCustomizationEntity>>;
