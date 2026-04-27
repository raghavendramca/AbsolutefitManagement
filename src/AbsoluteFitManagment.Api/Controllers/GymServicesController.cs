using AbsoluteFitManagement.Application.Services.Commands.CreateGymService;
using AbsoluteFitManagement.Application.Services.Commands.CreateServiceVariation;
using AbsoluteFitManagement.Application.Services.Commands.DeleteGymService;
using AbsoluteFitManagement.Application.Services.Commands.DeleteServiceVariation;
using AbsoluteFitManagement.Application.Services.Commands.UpdateGymService;
using AbsoluteFitManagement.Application.Services.Queries.ListGymServices;
using AbsoluteFitManagement.Application.Services.Queries.ListServiceVariations;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Contracts.Services;
using AbsoluteFitManagement.Domain.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/services")]
public class GymServicesController : ApiController
{
    private readonly ISender _mediator;
    private readonly IGymServicesRepository _repository;

    public GymServicesController(ISender mediator, IGymServicesRepository repository)
    {
        _mediator = mediator;
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> ListServices(Guid gymId)
    {
        var withCounts = await _repository.ListByGymIdWithCountsAsync(gymId);
        return Ok(withCounts.ConvertAll(x => ToResponse(x.Service, x.VariationCount)));
    }

    [HttpPost]
    public async Task<IActionResult> CreateService(CreateGymServiceRequest request, Guid gymId)
    {
        var command = new CreateGymServiceCommand(gymId, request.Name, request.Description, request.CategoryType, request.SacCode, request.Tax);
        var result = await _mediator.Send(command);
        return result.Match(
            service => CreatedAtAction(nameof(ListServices), new { gymId }, ToResponse(service, 0)),
            Problem);
    }

    [HttpPut("{serviceId:guid}")]
    public async Task<IActionResult> UpdateService(UpdateGymServiceRequest request, Guid gymId, Guid serviceId)
    {
        var command = new UpdateGymServiceCommand(gymId, serviceId, request.Name, request.Description, request.CategoryType, request.SacCode, request.Tax, request.IsActive);
        var result = await _mediator.Send(command);
        return result.Match(
            service => Ok(ToResponse(service, 0)),
            Problem);
    }

    [HttpDelete("{serviceId:guid}")]
    public async Task<IActionResult> DeleteService(Guid gymId, Guid serviceId)
    {
        var result = await _mediator.Send(new DeleteGymServiceCommand(gymId, serviceId));
        return result.Match(_ => NoContent(), Problem);
    }

    [HttpGet("{serviceId:guid}/variations")]
    public async Task<IActionResult> ListVariations(Guid serviceId)
    {
        var result = await _mediator.Send(new ListServiceVariationsQuery(serviceId));
        return result.Match(
            variations => Ok(variations.ConvertAll(ToVariationResponse)),
            Problem);
    }

    [HttpPost("{serviceId:guid}/variations")]
    public async Task<IActionResult> CreateVariation(
        CreateServiceVariationRequest request,
        Guid gymId,
        Guid serviceId)
    {
        var command = new CreateServiceVariationCommand(
            gymId, serviceId,
            request.ServiceType, request.Name, request.ServiceFee,
            request.TimeHours, request.TimeMinutes, request.ValidityDays,
            request.MaxMembers, request.Tax, request.Category,
            request.OtpVerification, request.Upgradable, request.Transferable,
            request.AppointmentsApplicable, request.RegistrationFee,
            request.MinFeeLimit, request.MaxFeeLimit,
            request.EligibleForReferralBonus, request.ReferralBonusFromPurchase,
            request.PromoteOnline);

        var result = await _mediator.Send(command);
        return result.Match(
            v => CreatedAtAction(nameof(ListVariations), new { serviceId }, ToVariationResponse(v)),
            Problem);
    }

    [HttpDelete("{serviceId:guid}/variations/{variationId:guid}")]
    public async Task<IActionResult> DeleteVariation(Guid serviceId, Guid variationId)
    {
        var result = await _mediator.Send(new DeleteServiceVariationCommand(serviceId, variationId));
        return result.Match(_ => NoContent(), Problem);
    }

    private static GymServiceResponse ToResponse(GymService s, int variationCount) =>
        new(s.Id, s.GymId, s.Name, s.Description, s.IsActive, variationCount, s.CategoryType, s.SacCode, s.Tax);

    private static ServiceVariationResponse ToVariationResponse(ServiceVariation v) =>
        new(v.Id, v.ServiceId, v.ServiceType, v.Name, v.ServiceFee,
            v.TimeHours, v.TimeMinutes, v.ValidityDays, v.MaxMembers,
            v.Tax, v.Category, v.OtpVerification, v.Upgradable, v.Transferable,
            v.AppointmentsApplicable, v.RegistrationFee, v.MinFeeLimit, v.MaxFeeLimit,
            v.EligibleForReferralBonus, v.ReferralBonusFromPurchase, v.PromoteOnline, v.IsActive);
}
