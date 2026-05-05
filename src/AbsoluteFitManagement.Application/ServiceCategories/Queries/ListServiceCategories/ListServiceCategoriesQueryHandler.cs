using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.ServiceCategories.Queries.ListServiceCategories;

public class ListServiceCategoriesQueryHandler
    : IRequestHandler<ListServiceCategoriesQuery, ErrorOr<List<ServiceCategory>>>
{
    private readonly IServiceCategoryRepository _repository;

    public ListServiceCategoriesQueryHandler(IServiceCategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<ErrorOr<List<ServiceCategory>>> Handle(
        ListServiceCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.ListActiveWithActivitiesAsync();
    }
}
