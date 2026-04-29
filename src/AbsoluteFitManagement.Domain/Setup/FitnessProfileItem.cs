using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Setup;

public class FitnessProfileItem : Entity
{
    public Guid GymId { get; private set; }
    public string Category { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }
    public bool IsEnabled { get; private set; } = true;

    public FitnessProfileItem(Guid gymId, string category, string name, int sortOrder, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        GymId = gymId;
        Category = category;
        Name = name;
        SortOrder = sortOrder;
    }

    protected FitnessProfileItem() { }

    public void UpdateName(string name) => Name = name;
    public void UpdateSortOrder(int sortOrder) => SortOrder = sortOrder;
    public void Toggle() => IsEnabled = !IsEnabled;
}
