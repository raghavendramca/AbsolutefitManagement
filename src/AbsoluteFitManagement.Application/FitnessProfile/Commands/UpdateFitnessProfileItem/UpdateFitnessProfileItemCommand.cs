using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.FitnessProfile.Commands.UpdateFitnessProfileItem;

public record UpdateFitnessProfileItemCommand(Guid Id, string Name) : IRequest<ErrorOr<FitnessProfileItem>>;
