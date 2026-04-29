using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Apparel.Commands.CreateApparelItem;

public record CreateApparelItemCommand(Guid GymId, string Category, string Name) : IRequest<ErrorOr<ApparelItem>>;
