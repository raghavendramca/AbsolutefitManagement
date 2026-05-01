namespace AbsoluteFitManagement.Contracts.BillTemplates;

public record UpdateBillTemplateRequest(string State, string GstNumber, string BusinessName, string? TemplateJson);
