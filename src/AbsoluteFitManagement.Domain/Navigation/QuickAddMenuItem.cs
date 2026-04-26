namespace AbsoluteFitManagement.Domain.Navigation;

public class QuickAddMenuItem
{
    public Guid Id { get; private set; }
    public string Key { get; private set; } = null!;
    public string Label { get; private set; } = null!;
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }

    // null = visible to all roles; "Admin" = admin only
    public string? RequiredRole { get; set; }

    public QuickAddMenuItem(
        Guid id,
        string key,
        string label,
        int sortOrder,
        bool isActive,
        string? requiredRole = null)
    {
        Id = id;
        Key = key;
        Label = label;
        SortOrder = sortOrder;
        IsActive = isActive;
        RequiredRole = requiredRole;
    }

    private QuickAddMenuItem() { }
}
