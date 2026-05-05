using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.CreateServiceVariation;

public class CreateServiceVariationCommandHandler : IRequestHandler<CreateServiceVariationCommand, ErrorOr<ServiceVariation>>
{
    private readonly IGymServicesRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateServiceVariationCommandHandler(IGymServicesRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<ServiceVariation>> Handle(CreateServiceVariationCommand request, CancellationToken cancellationToken)
    {
        var service = await _repository.GetByIdAsync(request.ServiceId);
        if (service is null)
            return Error.NotFound(description: "Service not found");

        var variation = new ServiceVariation(
            gymId: request.GymId,
            serviceId: request.ServiceId,
            serviceType: request.ServiceType,
            name: request.Name,
            serviceFee: request.ServiceFee,
            timeHours: request.TimeHours,
            timeMinutes: request.TimeMinutes,
            daysPerWeek: request.DaysPerWeek,
            months: request.Months,
            numberOfSessions: request.NumberOfSessions,
            validityDays: request.ValidityDays,
            maxMembers: request.MaxMembers,
            tax: request.Tax,
            accessType: request.AccessType,
            category: request.Category,
            otpVerification: request.OtpVerification,
            upgradable: request.Upgradable,
            transferable: request.Transferable,
            allowFreeze: request.AllowFreeze,
            maxFreezeDays: request.MaxFreezeDays,
            minFreezeDays: request.MinFreezeDays,
            appointmentsApplicable: request.AppointmentsApplicable,
            registrationFee: request.RegistrationFee,
            minFeeLimit: request.MinFeeLimit,
            maxFeeLimit: request.MaxFeeLimit,
            eligibleForReferralBonus: request.EligibleForReferralBonus,
            referralBonusFromPurchase: request.ReferralBonusFromPurchase,
            termBatchDate: request.TermBatchDate,
            promoteOnline: request.PromoteOnline);

        await _repository.AddVariationAsync(variation);
        await _unitOfWork.CommitChangesAsync();
        return variation;
    }
}
