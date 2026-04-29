using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Commands.ToggleApparelItem;

public record ToggleApparelItemCommand(Guid Id) : IRequest<ErrorOr<ApparelItem>>;
