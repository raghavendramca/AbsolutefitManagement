using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.BillTemplates.Commands.UpdateBillTemplate;

public record UpdateBillTemplateCommand(Guid Id, string State, string GstNumber, string BusinessName, string? TemplateJson) : IRequest<ErrorOr<BillTemplate>>;
