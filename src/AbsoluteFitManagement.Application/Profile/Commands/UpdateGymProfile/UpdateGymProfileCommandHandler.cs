using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;

namespace AbsoluteFitManagement.Application.Profile.Commands.UpdateGymProfile;

public class UpdateGymProfileCommandHandler : IRequestHandler<UpdateGymProfileCommand, ErrorOr<GymProfile>>
{
    private readonly IGymProfileRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateGymProfileCommandHandler(IGymProfileRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<GymProfile>> Handle(UpdateGymProfileCommand request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetByGymIdAsync(request.GymId);
        bool isNew = profile is null;
        profile ??= new GymProfile(request.GymId);

        profile.Update(
            request.Country, request.StateRegion, request.City, request.Locality,
            request.Currency, request.Region, request.Timezone, request.BusinessType,
            request.BrandName, request.PhoneNumber, request.Email,
            request.Latitude, request.Longitude, request.Address,
            request.AreaSqft, request.OperatingHoursJson);

        if (isNew)
            await _repository.AddAsync(profile);
        else
            await _repository.UpdateAsync(profile);

        await _unitOfWork.CommitChangesAsync();
        return profile;
    }
}
