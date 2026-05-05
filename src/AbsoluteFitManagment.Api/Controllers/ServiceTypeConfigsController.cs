using AbsoluteFitManagement.Application.ServiceCategories.Queries.ListServiceTypeConfigs;
using AbsoluteFitManagement.Contracts.ServiceCategories;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("service-type-configs")]
public class ServiceTypeConfigsController : ApiController
{
    private readonly ISender _mediator;

    public ServiceTypeConfigsController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List()
    {
        var result = await _mediator.Send(new ListServiceTypeConfigsQuery());
        return result.Match(
            configs => Ok(configs.ConvertAll(ToResponse)),
            Problem);
    }

    private static ServiceTypeConfigResponse ToResponse(ServiceTypeConfig c) =>
        new(c.Id, c.Name, c.SortOrder,
            c.ShowDaysPerWeek, c.ShowMonths,
            c.ShowTimeHours, c.ShowTimeMinutes,
            c.ShowNumberOfSessions, c.ShowValidityDays, c.ValidityDaysIsDropdown,
            c.ShowMaxMembers, c.ShowAccessType, c.ShowCategory,
            c.ShowOtpVerification, c.ShowUpgradable, c.ShowTransferable,
            c.ShowAllowFreeze, c.ShowFreezeDays,
            c.ShowAppointmentsApplicable, c.ShowRegistrationFee,
            c.ShowFeeLimits, c.ShowReferralBonus, c.ShowTermBatchDate);
}
