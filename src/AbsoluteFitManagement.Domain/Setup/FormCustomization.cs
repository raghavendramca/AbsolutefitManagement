using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Setup;

public class FormCustomization : Entity
{
    public Guid GymId { get; private set; }
    public string FormType { get; private set; } = string.Empty;
    public string FieldsJson { get; private set; } = "[]";

    public FormCustomization(Guid gymId, string formType, Guid? id = null) : base(id ?? Guid.NewGuid())
    {
        GymId = gymId;
        FormType = formType;
    }

    protected FormCustomization() { }

    public void Update(string fieldsJson)
    {
        FieldsJson = fieldsJson;
    }
}
