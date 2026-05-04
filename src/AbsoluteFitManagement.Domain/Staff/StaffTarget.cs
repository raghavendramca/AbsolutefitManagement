using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Staff;

public class StaffTarget : Entity
{
    public Guid GymId { get; set; }
    public Guid StaffId { get; set; }
    public string TargetCategory { get; set; } = null!;
    public string TargetType { get; set; } = null!;
    public int Year { get; set; }
    public string MonthlyValuesJson { get; set; } = "[]";
    public DateTime CreatedAt { get; set; }

    public StaffTarget(
        Guid gymId,
        Guid staffId,
        string targetCategory,
        string targetType,
        int year,
        string monthlyValuesJson,
        Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        GymId = gymId;
        StaffId = staffId;
        TargetCategory = targetCategory;
        TargetType = targetType;
        Year = year;
        MonthlyValuesJson = monthlyValuesJson;
        CreatedAt = DateTime.UtcNow;
    }

    protected StaffTarget() { }
}
