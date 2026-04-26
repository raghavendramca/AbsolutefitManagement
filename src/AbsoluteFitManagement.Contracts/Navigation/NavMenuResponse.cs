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
