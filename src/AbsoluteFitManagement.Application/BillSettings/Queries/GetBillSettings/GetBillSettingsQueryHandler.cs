using AbsoluteFitManagement.Application.Common.Interfaces;
using ErrorOr;
using MediatR;
using BillSettingsEntity = AbsoluteFitManagement.Domain.Setup.BillSettings;

namespace AbsoluteFitManagement.Application.BillSettings.Queries.GetBillSettings;

public class GetBillSettingsQueryHandler : IRequestHandler<GetBillSettingsQuery, ErrorOr<BillSettingsEntity>>
{
    private readonly IBillSettingsRepository _repository;
    private readonly IGymsRepository _gymsRepository;

    public GetBillSettingsQueryHandler(IBillSettingsRepository repository, IGymsRepository gymsRepository)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
    }

    public async Task<ErrorOr<BillSettingsEntity>> Handle(GetBillSettingsQuery request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        var settings = await _repository.GetByGymAndKeyAsync(request.GymId, request.SettingKey)
            ?? new BillSettingsEntity(request.GymId, request.SettingKey);

        return settings;
    }
}
