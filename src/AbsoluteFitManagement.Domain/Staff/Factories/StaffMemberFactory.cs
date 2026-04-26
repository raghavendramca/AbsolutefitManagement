using AbsoluteFitManagement.Domain.Common.Factories;

namespace AbsoluteFitManagement.Domain.Staff.Factories;

public class StaffMemberFactory : EntityFactory<StaffMember>
{
    public StaffMember Create(
        Guid gymId,
        int staffCode,
        string fullName,
        string contactNumber,
        string role,
        DateOnly joinDate,
        string countryCode = "+91",
        string? email = null,
        string? designation = null,
        string? adminRights = null,
        string? attendanceId = null,
        decimal? salary = null,
        string? gender = null,
        string? address = null,
        bool isActive = true,
        Guid? id = null)
    {
        var staff = new StaffMember(
            gymId, staffCode, fullName, contactNumber, role, joinDate,
            countryCode, email, designation, adminRights,
            attendanceId, salary, gender, address, isActive, id);
        OnCreated(staff);
        return staff;
    }
}
