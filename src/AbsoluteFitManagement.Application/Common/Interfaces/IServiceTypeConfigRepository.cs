using AbsoluteFitManagement.Domain.Setup;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IServiceTypeConfigRepository
{
    Task<List<ServiceTypeConfig>> ListOrderedAsync();
}
