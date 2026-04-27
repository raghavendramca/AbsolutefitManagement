using AbsoluteFitManagement.Application.Profile.Commands.UpdateGymProfile;
using AbsoluteFitManagement.Application.Profile.Queries.GetGymProfile;
using AbsoluteFitManagement.Contracts.Profile;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/profile")]
public class GymProfileController : ApiController
{
    private readonly ISender _mediator;

    public GymProfileController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetProfile(Guid gymId)
    {
        var result = await _mediator.Send(new GetGymProfileQuery(gymId));
        return result.Match(p => Ok(ToResponse(p)), Problem);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile(UpdateGymProfileRequest request, Guid gymId)
    {
        var command = new UpdateGymProfileCommand(
            gymId,
            request.Country, request.StateRegion, request.City, request.Locality,
            request.Currency, request.Region, request.Timezone, request.BusinessType,
            request.BrandName, request.PhoneNumber, request.Email,
            request.Latitude, request.Longitude, request.Address,
            request.AreaSqft, request.OperatingHoursJson);

        var result = await _mediator.Send(command);
        return result.Match(p => Ok(ToResponse(p)), Problem);
    }

    private static GymProfileResponse ToResponse(GymProfile p) =>
        new(p.Id, p.GymId, p.Country, p.StateRegion, p.City, p.Locality,
            p.Currency, p.Region, p.Timezone, p.BusinessType, p.BrandName,
            p.PhoneNumber, p.Email, p.Latitude, p.Longitude, p.Address,
            p.AreaSqft, p.OperatingHoursJson);
}
