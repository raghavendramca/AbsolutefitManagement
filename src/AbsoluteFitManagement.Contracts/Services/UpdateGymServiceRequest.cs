namespace AbsoluteFitManagement.Contracts.Services;

public record UpdateGymServiceRequest(
    string Name,
    string? Description,
    string CategoryType,
    string? SacCode,
    string? Tax,
    bool IsActive);
