namespace AbsoluteFitManagement.Contracts.ServiceCategories;

public record ServiceActivityResponse(Guid Id, string Name, int SortOrder);

public record ServiceCategoryResponse(
    Guid Id,
    string Name,
    int SortOrder,
    List<ServiceActivityResponse> Activities);
