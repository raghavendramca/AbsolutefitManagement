using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.BillTemplates.Commands.ToggleBillTemplate;

public record ToggleBillTemplateCommand(Guid Id) : IRequest<ErrorOr<BillTemplate>>;
