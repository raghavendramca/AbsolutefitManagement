namespace AbsoluteFitManagement.Domain.Members;

public class Member
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public Guid? EnquiryId { get; init; }      // set when converted from enquiry

    public string FullName { get; set; } = null!;
    public string CountryCode { get; set; } = "+91";
    public string ContactNumber { get; set; } = null!;
    public string? Email { get; set; }
    public string? Gender { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public string? Address { get; set; }
    public string? EmergencyContactName { get; set; }
    public string? EmergencyContactPhone { get; set; }
    public string? PhotoUrl { get; set; }
    public DateOnly JoinDate { get; set; }

    // Active | Inactive | Suspended | Expired
    public string Status { get; set; } = "Active";
    public DateTime CreatedAt { get; init; }

    public Member(
        Guid gymId,
        string fullName,
        string contactNumber,
        DateOnly joinDate,
        string countryCode = "+91",
        string? email = null,
        string? gender = null,
        DateOnly? dateOfBirth = null,
        string? address = null,
        Guid? enquiryId = null,
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        EnquiryId = enquiryId;
        FullName = fullName;
        CountryCode = countryCode;
        ContactNumber = contactNumber;
        Email = email;
        Gender = gender;
        DateOfBirth = dateOfBirth;
        Address = address;
        JoinDate = joinDate;
        Status = "Active";
        CreatedAt = DateTime.UtcNow;
    }

    public Member() { }
}
