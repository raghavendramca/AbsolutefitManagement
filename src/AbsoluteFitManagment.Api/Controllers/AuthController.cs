using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Contracts.Auth;
using AbsoluteFitManagement.Infrastructure.Common.Auth;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("auth")]
public class AuthController : ApiController
{
    private readonly IStudioUsersRepository _users;
    private readonly IAdminsRepository _admins;

    public AuthController(IStudioUsersRepository users, IAdminsRepository admins)
    {
        _users = users;
        _admins = admins;
    }

    [HttpPost("studio/login")]
    public async Task<IActionResult> StudioLogin([FromBody] StudioLoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { message = "Email and password are required." });

        var user = await _users.GetByEmailAsync(request.Email);

        if (user is null || !PasswordHasher.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password." });

        var admin = await _admins.GetByIdAsync(user.AdminId);

        if (admin is null || admin.SubscriptionId is null)
            return Unauthorized(new { message = "No tenant found for this account." });

        return Ok(new StudioLoginResponse(
            TenantId: admin.SubscriptionId.Value,
            AdminId: admin.Id));
    }
}
