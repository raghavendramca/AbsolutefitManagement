using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.BillTemplates.Commands.CreateBillTemplate;

public record CreateBillTemplateCommand(Guid GymId, string State, string GstNumber, string BusinessName, string? TemplateJson) : IRequest<ErrorOr<BillTemplate>>;
