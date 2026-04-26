namespace AbsoluteFitManagement.Domain.Common;

public abstract class GymScopedEntity : AuditableEntity
{
    public Guid GymId { get; protected set; }

    protected GymScopedEntity(Guid id, Guid gymId) : base(id) => GymId = gymId;

    protected GymScopedEntity() { }
}
