namespace AbsoluteFitManagement.Contracts.FitnessProfile;

public record FitnessProfileItemResponse(Guid Id, Guid GymId, string Category, string Name, int SortOrder, bool IsEnabled);
