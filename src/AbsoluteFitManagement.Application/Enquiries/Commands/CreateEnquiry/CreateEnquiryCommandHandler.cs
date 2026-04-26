using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Enquiries;
using AbsoluteFitManagement.Domain.Enquiries.Factories;
using MediatR;

namespace AbsoluteFitManagement.Application.Enquiries.Commands.CreateEnquiry;

public class CreateEnquiryCommandHandler : IRequestHandler<CreateEnquiryCommand, ErrorOr<Enquiry>>
{
    private readonly IEnquiriesRepository _enquiriesRepository;
    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly EnquiryFactory _enquiryFactory;

    public CreateEnquiryCommandHandler(
        IEnquiriesRepository enquiriesRepository,
        IGymsRepository gymsRepository,
        IUnitOfWork unitOfWork,
        EnquiryFactory enquiryFactory)
    {
        _enquiriesRepository = enquiriesRepository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
        _enquiryFactory = enquiryFactory;
    }

    public async Task<ErrorOr<Enquiry>> Handle(CreateEnquiryCommand request, CancellationToken cancellationToken)
    {
        var gymExists = await _gymsRepository.ExistsAsync(request.GymId);
        if (!gymExists)
            return Error.NotFound(description: "Gym not found");

        var enquiry = _enquiryFactory.Create(
            gymId: request.GymId,
            fullName: request.FullName,
            countryCode: request.CountryCode,
            contactNumber: request.ContactNumber,
            email: request.Email,
            gender: request.Gender,
            trialType: request.TrialType,
            enquiryDate: request.EnquiryDate,
            serviceName: request.ServiceName,
            leadSource: request.LeadSource,
            followUpStaffName: request.FollowUpStaffName,
            followUpDateTime: request.FollowUpDateTime,
            callTag: request.CallTag,
            message: request.Message,
            trialScheduledAt: request.TrialScheduledAt,
            trialService: request.TrialService,
            trialStaffName: request.TrialStaffName,
            trialClass: request.TrialClass,
            trialSession: request.TrialSession);

        await _enquiriesRepository.AddAsync(enquiry);
        await _unitOfWork.CommitChangesAsync();

        return enquiry;
    }
}
