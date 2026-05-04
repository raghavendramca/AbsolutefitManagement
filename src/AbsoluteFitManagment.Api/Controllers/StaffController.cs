using AbsoluteFitManagement.Domain.Staff;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Api.Controllers;

public record CreateStaffRequest(
    string FullName,
    string ContactNumber,
    string CountryCode,
    string? Email,
    string? Gender,
    string? Designation,
    string? AdminRights,
    string? AttendanceId,
    decimal? Salary,
    string? JoinDate,
    string? Address,
    string? ExtendedFieldsJson);

[Route("gyms/{gymId:guid}/staff")]
[ApiController]
public class StaffController : ControllerBase
{
    private readonly AbsoluteFitManagementDbContext _db;

    public StaffController(AbsoluteFitManagementDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> CreateStaff(Guid gymId, [FromBody] CreateStaffRequest request)
    {
        var maxCode = await _db.Staff.Where(s => s.GymId == gymId).MaxAsync(s => (int?)s.StaffCode) ?? 10000;
        var staffCode = maxCode + Random.Shared.Next(1, 99);

        var joinDate = DateOnly.TryParse(request.JoinDate, out var d) ? d : DateOnly.FromDateTime(DateTime.Today);
        var role = request.AdminRights ?? request.Designation ?? "Staff";

        var staff = new StaffMember(
            gymId, staffCode, request.FullName, request.ContactNumber, role, joinDate,
            request.CountryCode ?? "+91", request.Email, request.Designation,
            request.AdminRights, request.AttendanceId, request.Salary,
            request.Gender, request.Address, true, request.ExtendedFieldsJson);

        _db.Staff.Add(staff);
        await _db.SaveChangesAsync();

        return Ok(new
        {
            staff.Id, staff.StaffCode, staff.FullName, staff.Email,
            staff.AttendanceId, staff.AdminRights, staff.Designation, staff.IsActive,
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetStaff(Guid gymId, Guid id)
    {
        var s = await _db.Staff.FirstOrDefaultAsync(x => x.GymId == gymId && x.Id == id);
        if (s is null) return NotFound();
        return Ok(new
        {
            s.Id, s.StaffCode, s.FullName, s.Email, s.ContactNumber, s.CountryCode,
            s.Gender, s.Designation, s.AdminRights, s.AttendanceId, s.Salary,
            JoinDate = s.JoinDate.ToString("yyyy-MM-dd"), s.Address, s.IsActive, s.ExtendedFieldsJson, s.Role,
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateStaff(Guid gymId, Guid id, [FromBody] CreateStaffRequest request)
    {
        var member = await _db.Staff.FirstOrDefaultAsync(s => s.GymId == gymId && s.Id == id);
        if (member is null) return NotFound();

        member.FullName = request.FullName;
        member.ContactNumber = request.ContactNumber;
        if (request.CountryCode is not null) member.CountryCode = request.CountryCode;
        member.Email = request.Email;
        member.Gender = request.Gender;
        member.Designation = request.Designation;
        member.AdminRights = request.AdminRights;
        member.Role = request.AdminRights ?? request.Designation ?? member.Role;
        member.AttendanceId = request.AttendanceId;
        member.Salary = request.Salary;
        if (DateOnly.TryParse(request.JoinDate, out var d)) member.JoinDate = d;
        member.Address = request.Address;
        member.ExtendedFieldsJson = request.ExtendedFieldsJson;

        await _db.SaveChangesAsync();
        return Ok(new
        {
            member.Id, member.StaffCode, member.FullName, member.Email,
            member.AttendanceId, member.AdminRights, member.Designation, member.IsActive,
        });
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
