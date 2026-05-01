using AbsoluteFitManagement.Application.Common.Interfaces;
using ErrorOr;
using MediatR;
using BillSettingsEntity = AbsoluteFitManagement.Domain.Setup.BillSettings;

namespace AbsoluteFitManagement.Application.BillSettings.Commands.UpsertBillSettings;

public class UpsertBillSettingsCommandHandler : IRequestHandler<UpsertBillSettingsCommand, ErrorOr<BillSettingsEntity>>
{
    private readonly IBillSettingsRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UpsertBillSettingsCommandHandler(IBillSettingsRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<BillSettingsEntity>> Handle(UpsertBillSettingsCommand request, CancellationToken cancellationToken)
    {
        var settings = await _repository.GetByGymAndKeyAsync(request.GymId, request.SettingKey);
        bool isNew = settings is null;
        settings ??= new BillSettingsEntity(request.GymId, request.SettingKey);

        settings.Update(request.SettingsJson);

        if (isNew)
            await _repository.AddAsync(settings);
        else
            await _repository.UpdateAsync(settings);

        await _unitOfWork.CommitChangesAsync();
        return settings;
    }
}
