using AbsoluteFitManagement.Contracts.Navigation;
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

    [HttpGet("menu")]
    public async Task<IActionResult> GetNavMenu()
    {
        var items = await _db.NavMenuItems
            .Include(i => i.Flyout)
                .ThenInclude(f => f!.Sections)
                    .ThenInclude(s => s.Items)
            .OrderBy(i => i.SortOrder)
            .ToListAsync();

        var response = items.Select(i => new NavMenuItemResponse(
            i.Key,
            i.Label,
            i.IconName,
            i.IsExpandable,
            i.Route,
            i.Flyout == null ? null : new NavFlyoutResponse(
                i.Flyout.Title,
                i.Flyout.Sections
                    .OrderBy(s => s.SortOrder)
                    .Select(s => new NavSectionResponse(
                        s.Label,
                        s.Items
                            .OrderBy(x => x.SortOrder)
                            .Select(x => new NavSectionItemResponse(x.Label, x.Route))
                            .ToList()
                    ))
                    .ToList()
            )
        )).ToList();

        return Ok(response);
    }
}
