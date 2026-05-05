using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Setup;

public class ServiceCategory : Entity
{
    private readonly List<ServiceActivity> _activities = new();

    public string Name { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }
    public bool IsActive { get; private set; } = true;
    public IReadOnlyList<ServiceActivity> Activities => _activities.AsReadOnly();

    public ServiceCategory(string name, int sortOrder, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        Name = name;
        SortOrder = sortOrder;
    }

    protected ServiceCategory() { }

    public void UpdateName(string name) => Name = name;
    public void SetSortOrder(int order) => SortOrder = order;
    public void Activate() => IsActive = true;
    public void Deactivate() => IsActive = false;
}
