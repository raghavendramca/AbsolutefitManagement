namespace AbsoluteFitManagement.Domain.Users;

public class StudioUser
{
    public Guid Id { get; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }
    public Guid AdminId { get; private set; }

    public StudioUser(string email, string passwordHash, Guid adminId, Guid? id = null)
    {
        Email = email;
        PasswordHash = passwordHash;
        AdminId = adminId;
        Id = id ?? Guid.NewGuid();
    }

    private StudioUser() { Email = null!; PasswordHash = null!; }

    public void UpdatePasswordHash(string newPasswordHash)
    {
        PasswordHash = newPasswordHash;
    }
}
