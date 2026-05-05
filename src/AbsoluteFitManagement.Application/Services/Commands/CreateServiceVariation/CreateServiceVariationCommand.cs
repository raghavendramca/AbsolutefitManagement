using ErrorOr;
using AbsoluteFitManagement.Domain.Services;
using MediatR;

namespace AbsoluteFitManagement.Application.Services.Commands.CreateServiceVariation;

public record CreateServiceVariationCommand(
    Guid GymId,
    Guid ServiceId,
    string ServiceType,
    string Name,
    decimal ServiceFee,
    int TimeHours,
    int TimeMinutes,
    int DaysPerWeek,
    int Months,
    int NumberOfSessions,
    int ValidityDays,
    int MaxMembers,
    string Tax,
    string? AccessType,
    string Category,
    bool OtpVerification,
    bool Upgradable,
    bool Transferable,
    bool AllowFreeze,
    int MaxFreezeDays,
    int MinFreezeDays,
    bool AppointmentsApplicable,
    bool RegistrationFee,
    decimal MinFeeLimit,
    decimal MaxFeeLimit,
    bool EligibleForReferralBonus,
    bool ReferralBonusFromPurchase,
    bool TermBatchDate,
    bool PromoteOnline) : IRequest<ErrorOr<ServiceVariation>>;
