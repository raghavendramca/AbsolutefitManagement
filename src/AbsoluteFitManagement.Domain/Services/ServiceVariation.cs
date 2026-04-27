using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Services;

public class ServiceVariation : GymScopedEntity
{
    public Guid ServiceId { get; set; }
    public string ServiceType { get; set; } = null!;
    public string Name { get; set; } = null!;
    public decimal ServiceFee { get; set; }
    public int TimeHours { get; set; }
    public int TimeMinutes { get; set; }
    public int ValidityDays { get; set; }
    public int MaxMembers { get; set; } = 1;
    public string Tax { get; set; } = "No Tax";
    public string Category { get; set; } = null!;
    public bool OtpVerification { get; set; }
    public bool Upgradable { get; set; }
    public bool Transferable { get; set; }
    public bool AppointmentsApplicable { get; set; }
    public bool RegistrationFee { get; set; }
    public decimal MinFeeLimit { get; set; }
    public decimal MaxFeeLimit { get; set; }
    public bool EligibleForReferralBonus { get; set; }
    public bool ReferralBonusFromPurchase { get; set; }
    public bool PromoteOnline { get; set; }
    public bool IsActive { get; set; } = true;

    public ServiceVariation(
        Guid gymId,
        Guid serviceId,
        string serviceType,
        string name,
        decimal serviceFee,
        int timeHours,
        int timeMinutes,
        int validityDays,
        int maxMembers,
        string tax,
        string category,
        bool otpVerification,
        bool upgradable,
        bool transferable,
        bool appointmentsApplicable,
        bool registrationFee,
        decimal minFeeLimit,
        decimal maxFeeLimit,
        bool eligibleForReferralBonus,
        bool referralBonusFromPurchase,
        bool promoteOnline,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        ServiceId = serviceId;
        ServiceType = serviceType;
        Name = name;
        ServiceFee = serviceFee;
        TimeHours = timeHours;
        TimeMinutes = timeMinutes;
        ValidityDays = validityDays;
        MaxMembers = maxMembers;
        Tax = tax;
        Category = category;
        OtpVerification = otpVerification;
        Upgradable = upgradable;
        Transferable = transferable;
        AppointmentsApplicable = appointmentsApplicable;
        RegistrationFee = registrationFee;
        MinFeeLimit = minFeeLimit;
        MaxFeeLimit = maxFeeLimit;
        EligibleForReferralBonus = eligibleForReferralBonus;
        ReferralBonusFromPurchase = referralBonusFromPurchase;
        PromoteOnline = promoteOnline;
    }

    protected ServiceVariation() { }
}
