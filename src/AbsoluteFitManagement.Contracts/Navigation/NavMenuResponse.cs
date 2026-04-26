namespace AbsoluteFitManagement.Contracts.Navigation;

public record NavMenuItemResponse(
    string Key,
    string Label,
    string IconName,
    bool IsExpandable,
    string? Route,
    NavFlyoutResponse? Flyout);

public record NavFlyoutResponse(
    string Title,
    List<NavSectionResponse> Sections);

public record NavSectionResponse(
    string Label,
    List<NavSectionItemResponse> Items);

public record NavSectionItemResponse(
    string Label,
    string? Route);

/// <summary>
/// One entry in the quick-add (+) dropdown.
/// RequiredRole is null when the item is visible to all roles.
/// </summary>
public record QuickAddMenuItemResponse(
    string Key,
    string Label,
    int SortOrder,
    string? RequiredRole);
