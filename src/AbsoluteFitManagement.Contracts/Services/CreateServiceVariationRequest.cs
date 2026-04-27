namespace AbsoluteFitManagement.Contracts.Services;

public record CreateServiceVariationRequest(
    string ServiceType,
    string Name,
    decimal ServiceFee,
    int TimeHours,
    int TimeMinutes,
    int ValidityDays,
    int MaxMembers,
    string Tax,
    string Category,
    bool OtpVerification,
    bool Upgradable,
    bool Transferable,
    bool AppointmentsApplicable,
    bool RegistrationFee,
    decimal MinFeeLimit,
    decimal MaxFeeLimit,
    bool EligibleForReferralBonus,
    bool ReferralBonusFromPurchase,
    bool PromoteOnline);
