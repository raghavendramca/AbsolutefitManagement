using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("[controller]")]
[ApiController]
public class NavigationController : ControllerBase
{
    private readonly AbsoluteFitManagementDbContext _db;

    public NavigationController(AbsoluteFitManagementDbContext db)
    {
        _db = db;
    }

    [HttpGet("login-options")]
    public async Task<IActionResult> GetLoginOptions()
    {
        var options = await _db.LoginOptions
            .OrderBy(o => o.DisplayOrder)
            .Select(o => new { o.Id, o.Label, o.Route })
            .ToListAsync();

        return Ok(options);
    }
}
