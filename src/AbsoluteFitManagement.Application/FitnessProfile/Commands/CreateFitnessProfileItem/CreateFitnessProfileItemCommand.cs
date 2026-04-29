using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.FitnessProfile.Commands.CreateFitnessProfileItem;

public record CreateFitnessProfileItemCommand(Guid GymId, string Category, string Name) : IRequest<ErrorOr<FitnessProfileItem>>;
