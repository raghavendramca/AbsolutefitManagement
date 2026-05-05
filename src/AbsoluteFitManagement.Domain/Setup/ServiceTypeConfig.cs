using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Setup;

public class ServiceTypeConfig : Entity
{
    public string Name { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }

    // Which fields are shown for this service type
    public bool ShowDaysPerWeek { get; private set; }
    public bool ShowMonths { get; private set; }
    public bool ShowTimeHours { get; private set; }
    public bool ShowTimeMinutes { get; private set; }
    public bool ShowNumberOfSessions { get; private set; }
    public bool ShowValidityDays { get; private set; }
    public bool ValidityDaysIsDropdown { get; private set; }
    public bool ShowMaxMembers { get; private set; }
    public bool ShowAccessType { get; private set; }
    public bool ShowCategory { get; private set; }
    public bool ShowOtpVerification { get; private set; }
    public bool ShowUpgradable { get; private set; }
    public bool ShowTransferable { get; private set; }
    public bool ShowAllowFreeze { get; private set; }
    public bool ShowFreezeDays { get; private set; }
    public bool ShowAppointmentsApplicable { get; private set; }
    public bool ShowRegistrationFee { get; private set; }
    public bool ShowFeeLimits { get; private set; }
    public bool ShowReferralBonus { get; private set; }
    public bool ShowTermBatchDate { get; private set; }

    public ServiceTypeConfig(
        string name,
        int sortOrder,
        bool showDaysPerWeek,
        bool showMonths,
        bool showTimeHours,
        bool showTimeMinutes,
        bool showNumberOfSessions,
        bool showValidityDays,
        bool validityDaysIsDropdown,
        bool showMaxMembers,
        bool showAccessType,
        bool showCategory,
        bool showOtpVerification,
        bool showUpgradable,
        bool showTransferable,
        bool showAllowFreeze,
        bool showFreezeDays,
        bool showAppointmentsApplicable,
        bool showRegistrationFee,
        bool showFeeLimits,
        bool showReferralBonus,
        bool showTermBatchDate,
        Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        Name = name;
        SortOrder = sortOrder;
        ShowDaysPerWeek = showDaysPerWeek;
        ShowMonths = showMonths;
        ShowTimeHours = showTimeHours;
        ShowTimeMinutes = showTimeMinutes;
        ShowNumberOfSessions = showNumberOfSessions;
        ShowValidityDays = showValidityDays;
        ValidityDaysIsDropdown = validityDaysIsDropdown;
        ShowMaxMembers = showMaxMembers;
        ShowAccessType = showAccessType;
        ShowCategory = showCategory;
        ShowOtpVerification = showOtpVerification;
        ShowUpgradable = showUpgradable;
        ShowTransferable = showTransferable;
        ShowAllowFreeze = showAllowFreeze;
        ShowFreezeDays = showFreezeDays;
        ShowAppointmentsApplicable = showAppointmentsApplicable;
        ShowRegistrationFee = showRegistrationFee;
        ShowFeeLimits = showFeeLimits;
        ShowReferralBonus = showReferralBonus;
        ShowTermBatchDate = showTermBatchDate;
    }

    protected ServiceTypeConfig() { }
}
