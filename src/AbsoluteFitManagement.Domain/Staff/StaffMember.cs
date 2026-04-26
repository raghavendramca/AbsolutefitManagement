namespace AbsoluteFitManagement.Domain.Staff;

public class StaffMember
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public int StaffCode { get; init; }

    public string FullName { get; set; } = null!;
    public string? Email { get; set; }
    public string CountryCode { get; set; } = "+91";
    public string ContactNumber { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string? Designation { get; set; }
    public string? AdminRights { get; set; }
    public string? AttendanceId { get; set; }
    public decimal? Salary { get; set; }
    public DateOnly JoinDate { get; set; }
    public string? Gender { get; set; }
    public string? Address { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; init; }

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
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        StaffCode = staffCode;
        FullName = fullName;
        CountryCode = countryCode;
        ContactNumber = contactNumber;
        Email = email;
        Role = role;
        Designation = designation;
        AdminRights = adminRights;
        AttendanceId = attendanceId;
        Salary = salary;
        JoinDate = joinDate;
        Gender = gender;
        Address = address;
        IsActive = isActive;
        CreatedAt = DateTime.UtcNow;
    }

    public StaffMember() { }
}
