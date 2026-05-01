namespace AbsoluteFitManagement.Contracts.BillSettings;

public record UpsertBillSettingsRequest(string SettingKey, string SettingsJson);
