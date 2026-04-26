namespace AbsoluteFitManagement.Domain.Common;

public abstract class AuditableEntity : Entity
{
    public DateTime CreatedAt { get; protected set; }

    protected AuditableEntity(Guid id) : base(id) => CreatedAt = DateTime.UtcNow;

    protected AuditableEntity() { }
}
