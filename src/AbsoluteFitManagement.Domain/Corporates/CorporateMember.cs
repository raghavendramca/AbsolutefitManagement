namespace AbsoluteFitManagement.Domain.Corporates;

public class CorporateMember
{
    public Guid Id { get; init; }
    public Guid CorporateId { get; init; }
    public Guid MemberId { get; init; }
    public DateTime JoinedAt { get; init; }

    public CorporateMember(Guid corporateId, Guid memberId, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        CorporateId = corporateId;
        MemberId = memberId;
        JoinedAt = DateTime.UtcNow;
    }

    public CorporateMember() { }
}
