using ErrorOr;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Members;
using MediatR;

namespace AbsoluteFitManagement.Application.Members.Commands.UpdateMember;

public class UpdateMemberCommandHandler : IRequestHandler<UpdateMemberCommand, ErrorOr<Member>>
{
    private readonly IMembersRepository _membersRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateMemberCommandHandler(IMembersRepository membersRepository, IUnitOfWork unitOfWork)
    {
        _membersRepository = membersRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<Member>> Handle(UpdateMemberCommand request, CancellationToken cancellationToken)
    {
        var member = await _membersRepository.GetByIdAsync(request.MemberId);
        if (member is null)
            return Error.NotFound(description: "Member not found.");

        member.FullName              = request.FullName;
        member.CountryCode           = request.CountryCode;
        member.ContactNumber         = request.ContactNumber;
        member.Email                 = request.Email;
        member.Gender                = request.Gender;
        member.DateOfBirth           = request.DateOfBirth;
        member.Address               = request.Address;
        member.Locality              = request.Locality;
        member.EmergencyContactName  = request.EmergencyContactName;
        member.EmergencyContactPhone = request.EmergencyContactPhone;
        member.LeadSource            = request.LeadSource;
        member.ExtendedFieldsJson    = request.ExtendedFieldsJson;

        await _unitOfWork.CommitChangesAsync();

        return member;
    }
}
