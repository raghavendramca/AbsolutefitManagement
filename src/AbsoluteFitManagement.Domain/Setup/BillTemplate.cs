using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Setup;

public class BillTemplate : Entity
{
    public Guid GymId { get; private set; }
    public string State { get; private set; } = string.Empty;
    public string GstNumber { get; private set; } = string.Empty;
    public string BusinessName { get; private set; } = string.Empty;
    public bool IsActive { get; private set; } = true;
    public string? TemplateJson { get; private set; }

    public BillTemplate(Guid gymId, string state, string gstNumber, string businessName, string? templateJson = null, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        GymId = gymId;
        State = state;
        GstNumber = gstNumber;
        BusinessName = businessName;
        TemplateJson = templateJson;
    }

    protected BillTemplate() { }

    public void Update(string state, string gstNumber, string businessName, string? templateJson)
    {
        State = state;
        GstNumber = gstNumber;
        BusinessName = businessName;
        TemplateJson = templateJson;
    }

    public void Toggle() => IsActive = !IsActive;
}
