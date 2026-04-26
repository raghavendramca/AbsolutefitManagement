using AbsoluteFitManagement.Domain.Common.Factories;
using AbsoluteFitManagement.Domain.Members.Strategies;

namespace AbsoluteFitManagement.Domain.Members.Factories;

public class MembershipFactory : EntityFactory<Membership>
{
    public Membership Create(
        Guid gymId,
        Guid memberId,
        Guid planId,
        DateOnly startDate,
        DateOnly endDate,
        decimal basePrice,
        IMembershipPricingStrategy? pricingStrategy = null,
        string paymentStatus = "Pending",
        string? notes = null,
        Guid? id = null)
    {
        var strategy = pricingStrategy ?? new RegularMembershipPricingStrategy();
        var amountPaid = strategy.CalculateFinalPrice(basePrice);

        var membership = new Membership(gymId, memberId, planId, startDate, endDate,
            amountPaid, paymentStatus, notes, id);
        OnCreated(membership);
        return membership;
    }
}
