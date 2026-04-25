namespace AbsoluteFitManagement.Domain.Navigation;

public class LoginOption
{
    public int Id { get; private set; }
    public string Label { get; private set; } = null!;
    public string Route { get; private set; } = null!;
    public int DisplayOrder { get; private set; }

    public LoginOption(int id, string label, string route, int displayOrder)
    {
        Id = id;
        Label = label;
        Route = route;
        DisplayOrder = displayOrder;
    }

    private LoginOption() { }
}
