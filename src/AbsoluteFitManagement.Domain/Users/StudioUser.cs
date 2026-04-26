using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Users;

public class StudioUser : Entity
{
    public string Email { get; private set; } = null!;
    public string PasswordHash { get; private set; } = null!;
    public Guid AdminId { get; private set; }

    public StudioUser(string email, string passwordHash, Guid adminId, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        Email = email;
        PasswordHash = passwordHash;
        AdminId = adminId;
    }

    protected StudioUser() { }

    public void UpdatePasswordHash(string newPasswordHash) => PasswordHash = newPasswordHash;
}
