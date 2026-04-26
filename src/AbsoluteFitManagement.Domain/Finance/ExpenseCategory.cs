namespace AbsoluteFitManagement.Domain.Finance;

public class ExpenseCategory
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public string Name { get; set; } = null!;
    public bool IsActive { get; set; } = true;

    public ExpenseCategory(Guid gymId, string name, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        Name = name;
        IsActive = true;
    }

    public ExpenseCategory() { }
}
