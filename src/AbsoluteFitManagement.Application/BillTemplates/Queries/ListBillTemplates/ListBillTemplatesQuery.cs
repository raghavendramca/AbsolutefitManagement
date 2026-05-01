using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.BillTemplates.Queries.ListBillTemplates;

public record ListBillTemplatesQuery(Guid GymId) : IRequest<ErrorOr<List<BillTemplate>>>;
