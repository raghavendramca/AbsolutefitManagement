using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Members;
using AbsoluteFitManagement.Domain.Members.Factories;
using MediatR;

namespace AbsoluteFitManagement.Application.Members.Commands.CreateMember;

public class CreateMemberCommandHandler : IRequestHandler<CreateMemberCommand, ErrorOr<Member>>
{
    private readonly IMembersRepository _membersRepository;
    private readonly IGymsRepository _gymsRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly MemberFactory _memberFactory;

    public CreateMemberCommandHandler(
        IMembersRepository membersRepository,
        IGymsRepository gymsRepository,
        IUnitOfWork unitOfWork,
        MemberFactory memberFactory)
    {
        _membersRepository = membersRepository;
        _gymsRepository = gymsRepository;
        _unitOfWork = unitOfWork;
        _memberFactory = memberFactory;
    }

    public async Task<ErrorOr<Member>> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
    {
        var gymExists = await _gymsRepository.ExistsAsync(request.GymId);
        if (!gymExists)
            return Error.NotFound(description: "Gym not found");

        var member = _memberFactory.Create(
            gymId: request.GymId,
            fullName: request.FullName,
            contactNumber: request.ContactNumber,
            joinDate: DateOnly.FromDateTime(DateTime.UtcNow),
            countryCode: request.CountryCode,
            email: request.Email,
            gender: request.Gender,
            dateOfBirth: request.DateOfBirth,
            address: request.Address,
            locality: request.Locality,
            leadSource: request.LeadSource,
            extendedFieldsJson: request.ExtendedFieldsJson,
            enquiryId: request.EnquiryId);

        // Set emergency contact fields directly (not in factory to keep factory lean)
        member.EmergencyContactName  = request.EmergencyContactName;
        member.EmergencyContactPhone = request.EmergencyContactPhone;

        await _membersRepository.AddAsync(member);
        await _unitOfWork.CommitChangesAsync();

        return member;
    }
}
