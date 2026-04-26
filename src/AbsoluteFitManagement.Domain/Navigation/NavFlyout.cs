namespace AbsoluteFitManagement.Domain.Navigation;

public class NavFlyout
{
    public Guid Id { get; private set; }
    public Guid NavMenuItemId { get; private set; }
    public string Title { get; private set; } = null!;

    public List<NavSection> Sections { get; private set; } = [];

    public NavFlyout(Guid id, Guid navMenuItemId, string title)
    {
        Id = id;
        NavMenuItemId = navMenuItemId;
        Title = title;
    }

    private NavFlyout() { }
}
