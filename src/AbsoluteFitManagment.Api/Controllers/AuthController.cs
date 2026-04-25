using AbsoluteFitManagement.Contracts.Auth;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("auth")]
public class AuthController : ApiController
{
    // Well-known seeded IDs — stand-in until real user/auth tables are added
    private static readonly Guid SeedAdminId = Guid.Parse("0c97fb2a-479e-44b1-9353-dea3d9f418e1");

    private readonly AbsoluteFitManagementDbContext _db;

    public AuthController(AbsoluteFitManagementDbContext db)
    {
        _db = db;
    }

    /// <summary>
    /// Mock studio login. Accepts any credentials and returns the tenant's subscription ID.
    /// Replace this with real credential validation once a Users table is introduced.
    /// </summary>
    [HttpPost("studio/login")]
    public async Task<IActionResult> StudioLogin([FromBody] StudioLoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { message = "Email and password are required." });

        var admin = await _db.Admins.AsNoTracking()
                                    .FirstOrDefaultAsync(a => a.Id == SeedAdminId);

        if (admin is null || admin.SubscriptionId is null)
            return Unauthorized(new { message = "No tenant found for this account." });

        return Ok(new StudioLoginResponse(
            TenantId: admin.SubscriptionId.Value,
            AdminId: admin.Id));
    }
}
