using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Staff;

public class StaffMember : PersonEntity
{
    public int StaffCode { get; init; }
    public string Role { get; set; } = null!;
    public string? Designation { get; set; }
    public string? AdminRights { get; set; }
    public string? AttendanceId { get; set; }
    public decimal? Salary { get; set; }
    public DateOnly JoinDate { get; set; }
    public string? Address { get; set; }
    public bool IsActive { get; set; } = true;
    public string? ExtendedFieldsJson { get; set; }

    public StaffMember(
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
        string? extendedFieldsJson = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId, fullName, countryCode, contactNumber, email, gender)
    {
        StaffCode = staffCode;
        Role = role;
        Designation = designation;
        AdminRights = adminRights;
        AttendanceId = attendanceId;
        Salary = salary;
        JoinDate = joinDate;
        Address = address;
        IsActive = isActive;
        ExtendedFieldsJson = extendedFieldsJson;
    }

    protected StaffMember() { }
}
