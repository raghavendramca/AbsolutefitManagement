using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.UpdateServiceVariation;

public class UpdateServiceVariationCommandHandler : IRequestHandler<UpdateServiceVariationCommand, ErrorOr<ServiceVariation>>
{
    private readonly IGymServicesRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateServiceVariationCommandHandler(IGymServicesRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<ServiceVariation>> Handle(UpdateServiceVariationCommand request, CancellationToken cancellationToken)
    {
        var variation = await _repository.GetVariationByIdAsync(request.VariationId);
        if (variation is null)
            return Error.NotFound(description: "Service variation not found");

        variation.Update(
            request.Name,
            request.ServiceFee,
            request.TimeHours,
            request.TimeMinutes,
            request.DaysPerWeek,
            request.Months,
            request.NumberOfSessions,
            request.ValidityDays,
            request.MaxMembers,
            request.Tax,
            request.AccessType,
            request.Category,
            request.OtpVerification,
            request.Upgradable,
            request.Transferable,
            request.AllowFreeze,
            request.MaxFreezeDays,
            request.MinFreezeDays,
            request.AppointmentsApplicable,
            request.RegistrationFee,
            request.MinFeeLimit,
            request.MaxFeeLimit,
            request.EligibleForReferralBonus,
            request.ReferralBonusFromPurchase,
            request.TermBatchDate,
            request.PromoteOnline);

        await _unitOfWork.CommitChangesAsync();
        return variation;
    }
}
