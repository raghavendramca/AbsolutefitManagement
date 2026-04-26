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

    /// <summary>
    /// Returns active quick-add menu items filtered by the caller's role.
    /// Pass ?role=Admin to include admin-only items.
    /// </summary>
    [HttpGet("quick-add-items")]
    public async Task<IActionResult> GetQuickAddItems([FromQuery] string role = "Staff")
    {
        var isAdmin = string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase);

        var items = await _db.QuickAddMenuItems
            .Where(x => x.IsActive &&
                        (x.RequiredRole == null || (isAdmin && x.RequiredRole == "Admin")))
            .OrderBy(x => x.SortOrder)
            .Select(x => new QuickAddMenuItemResponse(x.Key, x.Label, x.SortOrder, x.RequiredRole))
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>
    /// Admin: toggle the IsActive flag for a quick-add menu item.
    /// </summary>
    [HttpPatch("quick-add-items/{key}/toggle")]
    public async Task<IActionResult> ToggleQuickAddItem(string key)
    {
        var item = await _db.QuickAddMenuItems.FirstOrDefaultAsync(x => x.Key == key);
        if (item is null) return NotFound();

        item.IsActive = !item.IsActive;
        await _db.SaveChangesAsync();

        return Ok(new QuickAddMenuItemResponse(item.Key, item.Label, item.SortOrder, item.RequiredRole));
    }

    /// <summary>
    /// Admin: update RequiredRole for a quick-add menu item (null = all staff, "Admin" = admin only).
    /// </summary>
    [HttpPatch("quick-add-items/{key}/role")]
    public async Task<IActionResult> SetQuickAddItemRole(string key, [FromBody] SetQuickAddRoleRequest request)
    {
        var item = await _db.QuickAddMenuItems.FirstOrDefaultAsync(x => x.Key == key);
        if (item is null) return NotFound();

        item.RequiredRole = string.IsNullOrWhiteSpace(request.RequiredRole) ? null : request.RequiredRole;
        await _db.SaveChangesAsync();

        return Ok(new QuickAddMenuItemResponse(item.Key, item.Label, item.SortOrder, item.RequiredRole));
    }
}

public record SetQuickAddRoleRequest(string? RequiredRole);
