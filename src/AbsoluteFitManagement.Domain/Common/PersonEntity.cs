namespace AbsoluteFitManagement.Domain.Common;

public abstract class PersonEntity : GymScopedEntity
{
    public string FullName { get; set; } = null!;
    public string CountryCode { get; set; } = "+91";
    public string ContactNumber { get; set; } = null!;
    public string? Email { get; set; }
    public string? Gender { get; set; }

    protected PersonEntity(
        Guid id,
        Guid gymId,
        string fullName,
        string countryCode,
        string contactNumber,
        string? email,
        string? gender)
        : base(id, gymId)
    {
        FullName = fullName;
        CountryCode = countryCode;
        ContactNumber = contactNumber;
        Email = email;
        Gender = gender;
    }

    protected PersonEntity() { }
}
