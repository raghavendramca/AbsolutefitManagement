using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Setup;
using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.BillTemplates.Queries.ListBillTemplates;

public class ListBillTemplatesQueryHandler : IRequestHandler<ListBillTemplatesQuery, ErrorOr<List<BillTemplate>>>
{
    private readonly IBillTemplateRepository _repository;
    private readonly IGymsRepository _gymsRepository;

    public ListBillTemplatesQueryHandler(IBillTemplateRepository repository, IGymsRepository gymsRepository)
    {
        _repository = repository;
        _gymsRepository = gymsRepository;
    }

    public async Task<ErrorOr<List<BillTemplate>>> Handle(ListBillTemplatesQuery request, CancellationToken cancellationToken)
    {
        if (!await _gymsRepository.ExistsAsync(request.GymId))
            return Error.NotFound(description: "Gym not found");

        return await _repository.ListByGymAsync(request.GymId);
    }
}
