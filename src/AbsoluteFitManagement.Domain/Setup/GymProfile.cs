using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Setup;

public class GymProfile : Entity
{
    public Guid GymId { get; set; }
    public string Country { get; set; } = "India";
    public string StateRegion { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Locality { get; set; } = string.Empty;
    public string Currency { get; set; } = "₹";
    public string Region { get; set; } = string.Empty;
    public string Timezone { get; set; } = "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi";
    public string BusinessType { get; set; } = "Fitness";
    public string BrandName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Address { get; set; } = string.Empty;
    public double AreaSqft { get; set; }
    public string OperatingHoursJson { get; set; } = "{}";

    public GymProfile(Guid gymId, Guid? id = null) : base(id ?? Guid.NewGuid())
    {
        GymId = gymId;
    }

    protected GymProfile() { }

    public void Update(
        string country,
        string stateRegion,
        string city,
        string locality,
        string currency,
        string region,
        string timezone,
        string businessType,
        string brandName,
        string phoneNumber,
        string email,
        double latitude,
        double longitude,
        string address,
        double areaSqft,
        string operatingHoursJson)
    {
        Country = country;
        StateRegion = stateRegion;
        City = city;
        Locality = locality;
        Currency = currency;
        Region = region;
        Timezone = timezone;
        BusinessType = businessType;
        BrandName = brandName;
        PhoneNumber = phoneNumber;
        Email = email;
        Latitude = latitude;
        Longitude = longitude;
        Address = address;
        AreaSqft = areaSqft;
        OperatingHoursJson = operatingHoursJson;
    }
}
