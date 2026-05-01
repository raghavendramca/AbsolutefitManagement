namespace AbsoluteFitManagement.Contracts.BillTemplates;

public record BillTemplateResponse(Guid Id, Guid GymId, string State, string GstNumber, string BusinessName, bool IsActive, string? TemplateJson);
