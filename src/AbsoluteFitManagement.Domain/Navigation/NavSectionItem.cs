namespace AbsoluteFitManagement.Domain.Navigation;

public class NavSectionItem
{
    public Guid Id { get; private set; }
    public Guid NavSectionId { get; private set; }
    public string Label { get; private set; } = null!;
    public string? Route { get; private set; }
    public int SortOrder { get; private set; }

    public NavSectionItem(Guid id, Guid navSectionId, string label, int sortOrder, string? route = null)
    {
        Id = id;
        NavSectionId = navSectionId;
        Label = label;
        SortOrder = sortOrder;
        Route = route;
    }

    private NavSectionItem() { }
}
