using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Finance;

public class ExpenseCategory : GymScopedEntity
{
    public string Name { get; set; } = null!;
    public bool IsActive { get; set; } = true;

    public ExpenseCategory(Guid gymId, string name, Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        Name = name;
        IsActive = true;
    }

    protected ExpenseCategory() { }
}
