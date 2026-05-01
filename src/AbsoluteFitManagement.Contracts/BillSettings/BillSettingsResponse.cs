namespace AbsoluteFitManagement.Contracts.BillSettings;

public record BillSettingsResponse(Guid Id, Guid GymId, string SettingKey, string SettingsJson);
