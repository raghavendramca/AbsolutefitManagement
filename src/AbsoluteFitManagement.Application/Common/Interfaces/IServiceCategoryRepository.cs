using AbsoluteFitManagement.Domain.Setup;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IServiceCategoryRepository
{
    Task<List<ServiceCategory>> ListActiveWithActivitiesAsync();
}
