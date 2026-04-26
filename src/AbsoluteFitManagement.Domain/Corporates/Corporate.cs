using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Corporates;

public class Corporate : GymScopedEntity
{
    public string CompanyName { get; set; } = null!;
    public string ContactPerson { get; set; } = null!;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public DateOnly ContractStartDate { get; set; }
    public DateOnly? ContractEndDate { get; set; }
    public int MembersAllowed { get; set; }
    public decimal DiscountPercent { get; set; }

    // Active | Inactive | Expired
    public string Status { get; set; } = "Active";

    public Corporate(
        Guid gymId,
        string companyName,
        string contactPerson,
        DateOnly contractStartDate,
        int membersAllowed,
        decimal discountPercent = 0,
        string? email = null,
        string? phone = null,
        string? address = null,
        DateOnly? contractEndDate = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        CompanyName = companyName;
        ContactPerson = contactPerson;
        Email = email;
        Phone = phone;
        Address = address;
        ContractStartDate = contractStartDate;
        ContractEndDate = contractEndDate;
        MembersAllowed = membersAllowed;
        DiscountPercent = discountPercent;
        Status = "Active";
    }

    protected Corporate() { }
}
