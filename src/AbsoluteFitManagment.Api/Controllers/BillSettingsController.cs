using AbsoluteFitManagement.Application.BillSettings.Commands.UpsertBillSettings;
using AbsoluteFitManagement.Application.BillSettings.Queries.GetBillSettings;
using AbsoluteFitManagement.Contracts.BillSettings;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using BillSettingsEntity = AbsoluteFitManagement.Domain.Setup.BillSettings;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("subscriptions/{subscriptionId:guid}/gyms/{gymId:guid}/bill-settings")]
public class BillSettingsController : ApiController
{
    private readonly ISender _mediator;

    public BillSettingsController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get(Guid gymId, [FromQuery] string settingKey)
    {
        var result = await _mediator.Send(new GetBillSettingsQuery(gymId, settingKey));
        return result.Match(s => Ok(ToResponse(s)), Problem);
    }

    [HttpPut]
    public async Task<IActionResult> Upsert([FromBody] UpsertBillSettingsRequest request, Guid gymId)
    {
        var result = await _mediator.Send(new UpsertBillSettingsCommand(gymId, request.SettingKey, request.SettingsJson));
        return result.Match(s => Ok(ToResponse(s)), Problem);
    }

    private static BillSettingsResponse ToResponse(BillSettingsEntity s) =>
        new(s.Id, s.GymId, s.SettingKey, s.SettingsJson);
}
