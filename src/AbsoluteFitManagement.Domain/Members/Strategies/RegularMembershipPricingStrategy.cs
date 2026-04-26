namespace AbsoluteFitManagement.Domain.Members.Strategies;

public class RegularMembershipPricingStrategy : IMembershipPricingStrategy
{
    public decimal CalculateFinalPrice(decimal basePrice) => basePrice;
}
