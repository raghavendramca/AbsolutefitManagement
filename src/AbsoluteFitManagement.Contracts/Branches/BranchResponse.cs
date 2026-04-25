namespace AbsoluteFitManagement.Contracts.Branches;

public record BranchResponse(
    Guid Id,
    int BranchCode,
    string Studio,
    string Locality,
    string City,
    string Role);
