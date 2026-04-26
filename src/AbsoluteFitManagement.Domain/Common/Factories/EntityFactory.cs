namespace AbsoluteFitManagement.Domain.Common.Factories;

// Abstract generic factory. Derived factories define domain-specific Create overloads.
public abstract class EntityFactory<TEntity> where TEntity : Entity
{
    // Template-method hook called after every Create invocation.
    protected virtual void OnCreated(TEntity entity) { }
}
