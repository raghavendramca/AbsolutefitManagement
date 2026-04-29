namespace AbsoluteFitManagement.Contracts.Apparel;

public record ApparelItemResponse(Guid Id, Guid GymId, string Category, string Name, int SortOrder, bool IsEnabled);
