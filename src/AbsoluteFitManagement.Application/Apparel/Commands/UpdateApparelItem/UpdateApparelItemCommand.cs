using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Commands.UpdateApparelItem;

public record UpdateApparelItemCommand(Guid Id, string Name) : IRequest<ErrorOr<ApparelItem>>;
