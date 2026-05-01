using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Setup;

public class BillSettings : Entity
{
    public Guid GymId { get; private set; }
    public string SettingKey { get; private set; } = string.Empty;
    public string SettingsJson { get; private set; } = "{}";

    public BillSettings(Guid gymId, string settingKey, Guid? id = null) : base(id ?? Guid.NewGuid())
    {
        GymId = gymId;
        SettingKey = settingKey;
    }

    protected BillSettings() { }

    public void Update(string settingsJson) => SettingsJson = settingsJson;
}
