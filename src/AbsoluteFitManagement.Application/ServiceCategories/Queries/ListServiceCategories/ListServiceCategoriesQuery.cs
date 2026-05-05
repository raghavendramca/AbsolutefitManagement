using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.ServiceCategories.Queries.ListServiceCategories;

public record ListServiceCategoriesQuery : IRequest<ErrorOr<List<ServiceCategory>>>;
