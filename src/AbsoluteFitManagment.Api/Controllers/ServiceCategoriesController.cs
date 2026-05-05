using AbsoluteFitManagement.Application.ServiceCategories.Queries.ListServiceCategories;
using AbsoluteFitManagement.Contracts.ServiceCategories;
using AbsoluteFitManagement.Domain.Setup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AbsoluteFitManagement.Api.Controllers;

[Route("service-categories")]
public class ServiceCategoriesController : ApiController
{
    private readonly ISender _mediator;

    public ServiceCategoriesController(ISender mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List()
    {
        var result = await _mediator.Send(new ListServiceCategoriesQuery());
        return result.Match(
            categories => Ok(categories.ConvertAll(ToResponse)),
            Problem);
    }

    private static ServiceCategoryResponse ToResponse(ServiceCategory category) =>
        new(
            category.Id,
            category.Name,
            category.SortOrder,
            category.Activities
                .Select(a => new ServiceActivityResponse(a.Id, a.Name, a.SortOrder))
                .ToList());
}
