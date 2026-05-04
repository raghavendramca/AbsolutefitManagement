using AbsoluteFitManagement.Application.Packages.Commands.CreateGymPackage;
using AbsoluteFitManagement.Application.Packages.Queries.ListGymPackages;
using AbsoluteFitManagement.Contracts.Packages;
using AbsoluteFitManagement.Domain.Packages;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/packages")]
public class GymPackagesController : ApiController
{
    private readonly ISender _mediator;

    public GymPackagesController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> ListPackages(Guid gymId)
    {
        var result = await _mediator.Send(new ListGymPackagesQuery(gymId));
        return result.Match(
            packages => Ok(packages.ConvertAll(ToResponse)),
            Problem);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePackage(CreateGymPackageRequest request, Guid subscriptionId, Guid gymId)
    {
        var command = new CreateGymPackageCommand(
            gymId,
            request.Name,
            request.Items.ConvertAll(i => new PackageItemInput(
                i.ServiceId, i.ServiceName, i.ServiceFee,
                i.Quantity, i.Discount, i.DiscountType)));

        var result = await _mediator.Send(command);
        return result.Match(
            pkg => CreatedAtAction(nameof(ListPackages), new { subscriptionId, gymId }, ToResponse(pkg)),
            Problem);
    }

    private static GymPackageResponse ToResponse(GymPackage p) =>
        new(p.Id, p.GymId, p.Name,
            p.Items.Select(i => new GymPackageItemResponse(
                i.Id, i.ServiceId, i.ServiceName,
                i.ServiceFee, i.Quantity, i.Discount, i.DiscountType)).ToList());
}
