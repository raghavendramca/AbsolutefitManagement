using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Enquiries;
using MediatR;

namespace AbsoluteFitManagement.Application.Enquiries.Commands.CreateEnquiry;

public class CreateEnquiryCommandHandler : IRequestHandler<CreateEnquiryCommand, ErrorOr<Enquiry>>
{
    private readonly IEnquiriesRepository _enquiriesRepository;
    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateEnquiryCommandHandler(
        IEnquiriesRepository enquiriesRepository,
        IGymsRepository gymsRepository,
        IUnitOfWork unitOfWork)
    {
        _enquiriesRepository = enquiriesRepository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<Enquiry>> Handle(CreateEnquiryCommand request, CancellationToken cancellationToken)
    {
        var gymExists = await _gymsRepository.ExistsAsync(request.GymId);
        if (!gymExists)
            return Error.NotFound(description: "Gym not found");

        var enquiry = new Enquiry(
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
            message: request.Message);

        await _enquiriesRepository.AddAsync(enquiry);
        await _unitOfWork.CommitChangesAsync();

        return enquiry;
    }
}
