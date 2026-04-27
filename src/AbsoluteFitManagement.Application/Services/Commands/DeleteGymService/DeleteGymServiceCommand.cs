using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.DeleteGymService;

public record DeleteGymServiceCommand(Guid GymId, Guid ServiceId) : IRequest<ErrorOr<Deleted>>;
