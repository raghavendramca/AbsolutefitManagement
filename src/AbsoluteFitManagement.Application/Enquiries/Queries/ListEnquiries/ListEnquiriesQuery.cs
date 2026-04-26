using ErrorOr;
using AbsoluteFitManagement.Domain.Enquiries;
using MediatR;

namespace AbsoluteFitManagement.Application.Enquiries.Queries.ListEnquiries;

public record ListEnquiriesQuery(Guid GymId) : IRequest<ErrorOr<List<Enquiry>>>;
