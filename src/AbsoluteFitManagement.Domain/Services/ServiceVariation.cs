using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Services;

public class ServiceVariation : GymScopedEntity
{
    public Guid ServiceId { get; set; }
    public string ServiceType { get; set; } = null!;
    public string Name { get; set; } = null!;
    public decimal ServiceFee { get; set; }

    // Time fields (1 Session, Multiple Sessions)
    public int TimeHours { get; set; }
    public int TimeMinutes { get; set; }

    // Membership-specific
    public int DaysPerWeek { get; set; }
    public int Months { get; set; }

    // Multiple Sessions-specific
    public int NumberOfSessions { get; set; }

    // Validity
    public int ValidityDays { get; set; }

    public int MaxMembers { get; set; } = 1;
    public string Tax { get; set; } = "No Tax";
    public string? AccessType { get; set; }
    public string Category { get; set; } = null!;

    public bool OtpVerification { get; set; }
    public bool Upgradable { get; set; }
    public bool Transferable { get; set; }
    public bool AllowFreeze { get; set; }
    public int MaxFreezeDays { get; set; }
    public int MinFreezeDays { get; set; } = 1;
    public bool AppointmentsApplicable { get; set; }
    public bool RegistrationFee { get; set; }
    public decimal MinFeeLimit { get; set; }
    public decimal MaxFeeLimit { get; set; }
    public bool EligibleForReferralBonus { get; set; }
    public bool ReferralBonusFromPurchase { get; set; }
    public bool TermBatchDate { get; set; }
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
        int daysPerWeek,
        int months,
        int numberOfSessions,
        int validityDays,
        int maxMembers,
        string tax,
        string? accessType,
        string category,
        bool otpVerification,
        bool upgradable,
        bool transferable,
        bool allowFreeze,
        int maxFreezeDays,
        int minFreezeDays,
        bool appointmentsApplicable,
        bool registrationFee,
        decimal minFeeLimit,
        decimal maxFeeLimit,
        bool eligibleForReferralBonus,
        bool referralBonusFromPurchase,
        bool termBatchDate,
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
        DaysPerWeek = daysPerWeek;
        Months = months;
        NumberOfSessions = numberOfSessions;
        ValidityDays = validityDays;
        MaxMembers = maxMembers;
        Tax = tax;
        AccessType = accessType;
        Category = category;
        OtpVerification = otpVerification;
        Upgradable = upgradable;
        Transferable = transferable;
        AllowFreeze = allowFreeze;
        MaxFreezeDays = maxFreezeDays;
        MinFreezeDays = minFreezeDays;
        AppointmentsApplicable = appointmentsApplicable;
        RegistrationFee = registrationFee;
        MinFeeLimit = minFeeLimit;
        MaxFeeLimit = maxFeeLimit;
        EligibleForReferralBonus = eligibleForReferralBonus;
        ReferralBonusFromPurchase = referralBonusFromPurchase;
        TermBatchDate = termBatchDate;
        PromoteOnline = promoteOnline;
    }

    public void Update(
        string name,
        decimal serviceFee,
        int timeHours,
        int timeMinutes,
        int daysPerWeek,
        int months,
        int numberOfSessions,
        int validityDays,
        int maxMembers,
        string tax,
        string? accessType,
        string category,
        bool otpVerification,
        bool upgradable,
        bool transferable,
        bool allowFreeze,
        int maxFreezeDays,
        int minFreezeDays,
        bool appointmentsApplicable,
        bool registrationFee,
        decimal minFeeLimit,
        decimal maxFeeLimit,
        bool eligibleForReferralBonus,
        bool referralBonusFromPurchase,
        bool termBatchDate,
        bool promoteOnline)
    {
        Name = name;
        ServiceFee = serviceFee;
        TimeHours = timeHours;
        TimeMinutes = timeMinutes;
        DaysPerWeek = daysPerWeek;
        Months = months;
        NumberOfSessions = numberOfSessions;
        ValidityDays = validityDays;
        MaxMembers = maxMembers;
        Tax = tax;
        AccessType = accessType;
        Category = category;
        OtpVerification = otpVerification;
        Upgradable = upgradable;
        Transferable = transferable;
        AllowFreeze = allowFreeze;
        MaxFreezeDays = maxFreezeDays;
        MinFreezeDays = minFreezeDays;
        AppointmentsApplicable = appointmentsApplicable;
        RegistrationFee = registrationFee;
        MinFeeLimit = minFeeLimit;
        MaxFeeLimit = maxFeeLimit;
        EligibleForReferralBonus = eligibleForReferralBonus;
        ReferralBonusFromPurchase = referralBonusFromPurchase;
        TermBatchDate = termBatchDate;
        PromoteOnline = promoteOnline;
    }

    protected ServiceVariation() { }
}
