using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Commands.MoveApparelItem;

public record MoveApparelItemCommand(Guid GymId, string Category, Guid ItemId, bool MoveUp) : IRequest<ErrorOr<List<ApparelItem>>>;
