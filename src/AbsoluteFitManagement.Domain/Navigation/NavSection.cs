namespace AbsoluteFitManagement.Domain.Navigation;

public class NavSection
{
    public Guid Id { get; private set; }
    public Guid NavFlyoutId { get; private set; }
    public string Label { get; private set; } = null!;
    public int SortOrder { get; private set; }

    public List<NavSectionItem> Items { get; private set; } = [];

    public NavSection(Guid id, Guid navFlyoutId, string label, int sortOrder)
    {
        Id = id;
        NavFlyoutId = navFlyoutId;
        Label = label;
        SortOrder = sortOrder;
    }

    private NavSection() { }
}
