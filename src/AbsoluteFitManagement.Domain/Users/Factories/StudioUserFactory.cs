using AbsoluteFitManagement.Domain.Common.Factories;

namespace AbsoluteFitManagement.Domain.Users.Factories;

public class StudioUserFactory : EntityFactory<StudioUser>
{
    public StudioUser Create(string email, string passwordHash, Guid adminId, Guid? id = null)
    {
        var user = new StudioUser(email, passwordHash, adminId, id);
        OnCreated(user);
        return user;
    }
}
