using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;

namespace AbsoluteFitManagement.Application.Profile.Queries.GetGymProfile;

public class GetGymProfileQueryHandler : IRequestHandler<GetGymProfileQuery, ErrorOr<GymProfile>>
{
    private readonly IGymProfileRepository _repository;

    public GetGymProfileQueryHandler(IGymProfileRepository repository)
    {
        _repository = repository;
    }

    public async Task<ErrorOr<GymProfile>> Handle(GetGymProfileQuery request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetByGymIdAsync(request.GymId);
        // Return default profile if none saved yet
        return profile ?? new GymProfile(request.GymId);
    }
}
