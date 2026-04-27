namespace AbsoluteFitManagement.Contracts.Profile;

public record UpdateGymProfileRequest(
    string Country,
    string StateRegion,
    string City,
    string Locality,
    string Currency,
    string Region,
    string Timezone,
    string BusinessType,
    string BrandName,
    string PhoneNumber,
    string Email,
    double Latitude,
    double Longitude,
    string Address,
    double AreaSqft,
    string OperatingHoursJson);
