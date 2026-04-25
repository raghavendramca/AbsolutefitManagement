using AbsoluteFitManagement.Application.Branches.Queries.ListBranches;
using AbsoluteFitManagement.Contracts.Branches;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("tenants/{tenantId:guid}/branches")]
public class BranchesController : ApiController
{
    private readonly ISender _mediator;

    public BranchesController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> ListBranches(Guid tenantId)
    {
        var query = new ListBranchesQuery(tenantId);
        var result = await _mediator.Send(query);

        return result.Match(
            branches => Ok(branches.Select((gym, idx) => new BranchResponse(
                gym.Id,
                gym.BranchCode,
                gym.Name,
                gym.Locality,
                gym.City,
                "Owner/Admin")).ToList()),
            Problem);
    }
}
