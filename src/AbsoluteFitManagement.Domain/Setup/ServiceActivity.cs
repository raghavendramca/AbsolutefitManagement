using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Setup;

public class ServiceActivity : Entity
{
    public Guid CategoryId { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }
    public bool IsActive { get; private set; } = true;

    public ServiceActivity(Guid categoryId, string name, int sortOrder, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        CategoryId = categoryId;
        Name = name;
        SortOrder = sortOrder;
    }

    protected ServiceActivity() { }

    public void UpdateName(string name) => Name = name;
    public void SetSortOrder(int order) => SortOrder = order;
    public void Activate() => IsActive = true;
    public void Deactivate() => IsActive = false;
}
