using ErrorOr;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.UpdateGymService;

public record UpdateGymServiceCommand(
    Guid GymId,
    Guid ServiceId,
    string Name,
    string? Description,
    string CategoryType,
    string? SacCode,
    string? Tax,
    bool IsActive) : IRequest<ErrorOr<GymService>>;
