namespace AbsoluteFitManagement.Contracts.Services;

public record GymServiceResponse(
    Guid Id,
    Guid GymId,
    string Name,
    string? Description,
    bool IsActive,
    int VariationCount,
    string CategoryType,
    string? SacCode,
    string? Tax);
