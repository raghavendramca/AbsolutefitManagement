using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Corporates;

// CreatedAt (from AuditableEntity) serves as the join date; mapped to "JoinedAt" column.
public class CorporateMember : AuditableEntity
{
    public Guid CorporateId { get; init; }
    public Guid MemberId { get; init; }

    public CorporateMember(Guid corporateId, Guid memberId, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        CorporateId = corporateId;
        MemberId = memberId;
    }

    protected CorporateMember() { }
}
