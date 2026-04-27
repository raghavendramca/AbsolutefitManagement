using ErrorOr;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;

namespace AbsoluteFitManagement.Application.Profile.Queries.GetGymProfile;

public record GetGymProfileQuery(Guid GymId) : IRequest<ErrorOr<GymProfile>>;
