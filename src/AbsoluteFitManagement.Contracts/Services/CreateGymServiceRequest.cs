namespace AbsoluteFitManagement.Contracts.Services;

public record CreateGymServiceRequest(
    string Name,
    string? Description = null,
    string CategoryType = "Brand",
    string? SacCode = null,
    string? Tax = null);
