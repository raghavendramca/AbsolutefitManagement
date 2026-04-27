using ErrorOr;
using MediatR;
using FormCustomizationEntity = AbsoluteFitManagement.Domain.Setup.FormCustomization;

namespace AbsoluteFitManagement.Application.FormCustomization.Commands.UpsertFormCustomization;

public record UpsertFormCustomizationCommand(
    Guid GymId,
    string FormType,
    string FieldsJson) : IRequest<ErrorOr<FormCustomizationEntity>>;
