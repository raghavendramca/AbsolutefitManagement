using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.FitnessProfile.Commands.ToggleFitnessProfileItem;

public record ToggleFitnessProfileItemCommand(Guid Id) : IRequest<ErrorOr<FitnessProfileItem>>;
