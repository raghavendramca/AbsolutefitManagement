namespace AbsoluteFitManagement.Contracts.BillTemplates;

public record CreateBillTemplateRequest(string State, string GstNumber, string BusinessName, string? TemplateJson);
