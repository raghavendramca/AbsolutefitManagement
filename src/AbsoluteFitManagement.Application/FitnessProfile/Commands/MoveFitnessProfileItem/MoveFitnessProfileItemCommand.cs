using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.FitnessProfile.Commands.MoveFitnessProfileItem;

public record MoveFitnessProfileItemCommand(Guid GymId, string Category, Guid ItemId, bool MoveUp) : IRequest<ErrorOr<List<FitnessProfileItem>>>;
