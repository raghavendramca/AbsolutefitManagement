namespace AbsoluteFitManagement.Contracts.FormCustomization;

public record FormCustomizationResponse(
    Guid Id,
    Guid GymId,
    string FormType,
    string FieldsJson);
