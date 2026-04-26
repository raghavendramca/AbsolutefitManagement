namespace AbsoluteFitManagement.Domain.Navigation;

public class NavMenuItem
{
    public Guid Id { get; private set; }
    public string Key { get; private set; } = null!;
    public string Label { get; private set; } = null!;
    public string IconName { get; private set; } = null!;
    public int SortOrder { get; private set; }
    public bool IsExpandable { get; private set; }
    public string? Route { get; private set; }

    public NavFlyout? Flyout { get; private set; }

    public NavMenuItem(Guid id, string key, string label, string iconName, int sortOrder, bool isExpandable, string? route = null)
    {
        Id = id;
        Key = key;
        Label = label;
        IconName = iconName;
        SortOrder = sortOrder;
        IsExpandable = isExpandable;
        Route = route;
    }

    private NavMenuItem() { }
}
