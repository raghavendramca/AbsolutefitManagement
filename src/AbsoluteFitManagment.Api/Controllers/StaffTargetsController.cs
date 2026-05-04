using AbsoluteFitManagement.Domain.Staff;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Api.Controllers;

public record CreateStaffTargetRequest(
    Guid StaffId,
    string TargetCategory,
    string TargetType,
    int Year,
    string MonthlyValuesJson);

[Route("gyms/{gymId:guid}/staff-targets")]
[ApiController]
public class StaffTargetsController : ControllerBase
{
    private readonly AbsoluteFitManagementDbContext _db;

    public StaffTargetsController(AbsoluteFitManagementDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> ListTargets(
        Guid gymId,
        [FromQuery] Guid? staffId,
        [FromQuery] string? targetCategory,
        [FromQuery] string? targetType,
        [FromQuery] int? year)
    {
        var query = _db.StaffTargets.Where(t => t.GymId == gymId);
        if (staffId.HasValue) query = query.Where(t => t.StaffId == staffId.Value);
        if (!string.IsNullOrEmpty(targetCategory)) query = query.Where(t => t.TargetCategory == targetCategory);
        if (!string.IsNullOrEmpty(targetType)) query = query.Where(t => t.TargetType == targetType);
        if (year.HasValue) query = query.Where(t => t.Year == year.Value);

        var results = await query
            .OrderByDescending(t => t.Year)
            .ThenBy(t => t.TargetCategory)
            .Select(t => new
            {
                t.Id,
                t.StaffId,
                t.TargetCategory,
                t.TargetType,
                t.Year,
                t.MonthlyValuesJson,
                t.CreatedAt,
            })
            .ToListAsync();

        return Ok(results);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTarget(Guid gymId, [FromBody] CreateStaffTargetRequest request)
    {
        var target = new StaffTarget(
            gymId,
            request.StaffId,
            request.TargetCategory,
            request.TargetType,
            request.Year,
            request.MonthlyValuesJson);

        _db.StaffTargets.Add(target);
        await _db.SaveChangesAsync();

        return Ok(new
        {
            target.Id,
            target.StaffId,
            target.TargetCategory,
            target.TargetType,
            target.Year,
            target.MonthlyValuesJson,
            target.CreatedAt,
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteTarget(Guid gymId, Guid id)
    {
        var target = await _db.StaffTargets.FirstOrDefaultAsync(t => t.GymId == gymId && t.Id == id);
        if (target is null) return NotFound();
        _db.StaffTargets.Remove(target);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
