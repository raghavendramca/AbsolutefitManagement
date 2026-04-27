using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Services;

public class GymService : GymScopedEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string CategoryType { get; set; } = "Brand";
    public string? SacCode { get; set; }
    public string? Tax { get; set; }
    public bool IsActive { get; set; } = true;

    public GymService(Guid gymId, string name, string? description = null, string categoryType = "Brand", string? sacCode = null, string? tax = null, Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        Name = name;
        Description = description;
        CategoryType = categoryType;
        SacCode = sacCode;
        Tax = tax;
        IsActive = true;
    }

    public void Update(string name, string? description, string categoryType, string? sacCode, string? tax)
    {
        Name = name;
        Description = description;
        CategoryType = categoryType;
        SacCode = sacCode;
        Tax = tax;
    }

    public void SetActive(bool isActive) => IsActive = isActive;

    protected GymService() { }
}
