using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("gyms/{gymId:guid}/staff")]
[ApiController]
public class StaffController : ControllerBase
{
    private readonly AbsoluteFitManagementDbContext _db;

    public StaffController(AbsoluteFitManagementDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> ListStaff(Guid gymId)
    {
        var staff = await _db.Staff
            .Where(s => s.GymId == gymId)
            .OrderBy(s => s.FullName)
            .Select(s => new
            {
                s.Id,
                s.StaffCode,
                s.FullName,
                s.Email,
                s.AttendanceId,
                s.AdminRights,
                s.Designation,
                s.IsActive,
            })
            .ToListAsync();

        return Ok(staff);
    }

    [HttpPatch("{id:guid}/toggle-active")]
    public async Task<IActionResult> ToggleActive(Guid gymId, Guid id)
    {
        var member = await _db.Staff.FirstOrDefaultAsync(s => s.GymId == gymId && s.Id == id);
        if (member is null) return NotFound();

        member.IsActive = !member.IsActive;
        await _db.SaveChangesAsync();

        return Ok(new { member.Id, member.IsActive });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteStaff(Guid gymId, Guid id)
    {
        var member = await _db.Staff.FirstOrDefaultAsync(s => s.GymId == gymId && s.Id == id);
        if (member is null) return NotFound();

        _db.Staff.Remove(member);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
