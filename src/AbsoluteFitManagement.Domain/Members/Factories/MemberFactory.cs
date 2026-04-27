using AbsoluteFitManagement.Domain.Common.Factories;

namespace AbsoluteFitManagement.Domain.Members.Factories;

public class MemberFactory : EntityFactory<Member>
{
    public Member Create(
        Guid gymId,
        string fullName,
        string contactNumber,
        DateOnly joinDate,
        string countryCode = "+91",
        string? email = null,
        string? gender = null,
        DateOnly? dateOfBirth = null,
        string? address = null,
        string? locality = null,
        string? leadSource = null,
        string? extendedFieldsJson = null,
        Guid? enquiryId = null,
        Guid? id = null)
    {
        var member = new Member(gymId, fullName, contactNumber, joinDate,
            countryCode, email, gender, dateOfBirth, address, locality, leadSource, extendedFieldsJson, enquiryId, id);
        OnCreated(member);
        return member;
    }
}
