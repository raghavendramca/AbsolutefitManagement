using ErrorOr;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;

namespace AbsoluteFitManagement.Application.Profile.Commands.UpdateGymProfile;

public record UpdateGymProfileCommand(
    Guid GymId,
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
    string OperatingHoursJson) : IRequest<ErrorOr<GymProfile>>;
