using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.DeleteServiceVariation;

public record DeleteServiceVariationCommand(Guid ServiceId, Guid VariationId) : IRequest<ErrorOr<Deleted>>;
