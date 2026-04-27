using ErrorOr;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.CreateGymService;

public record CreateGymServiceCommand(
    Guid GymId,
    string Name,
    string? Description,
    string CategoryType = "Brand",
    string? SacCode = null,
    string? Tax = null) : IRequest<ErrorOr<GymService>>;
