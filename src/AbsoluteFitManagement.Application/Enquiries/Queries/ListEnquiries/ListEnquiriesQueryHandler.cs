using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Enquiries;
using MediatR;

namespace AbsoluteFitManagement.Application.Enquiries.Queries.ListEnquiries;

public class ListEnquiriesQueryHandler : IRequestHandler<ListEnquiriesQuery, ErrorOr<List<Enquiry>>>
{
    private readonly IEnquiriesRepository _enquiriesRepository;
    private readonly IGymsRepository _gymsRepository;

    public ListEnquiriesQueryHandler(
        IEnquiriesRepository enquiriesRepository,
        IGymsRepository gymsRepository)
    {
        _enquiriesRepository = enquiriesRepository;
        _gymsRepository = gymsRepository;
    }

    public async Task<ErrorOr<List<Enquiry>>> Handle(ListEnquiriesQuery request, CancellationToken cancellationToken)
    {
        var gymExists = await _gymsRepository.ExistsAsync(request.GymId);
        if (!gymExists)
            return Error.NotFound(description: "Gym not found");

        var enquiries = await _enquiriesRepository.ListByGymIdAsync(request.GymId);
        return enquiries;
    }
}
