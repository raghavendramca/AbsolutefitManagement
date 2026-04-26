namespace AbsoluteFitManagement.Domain.Members.Strategies;

public class CorporateMembershipPricingStrategy : IMembershipPricingStrategy
{
    private readonly decimal _discountPercent;

    public CorporateMembershipPricingStrategy(decimal discountPercent)
        => _discountPercent = discountPercent;

    public decimal CalculateFinalPrice(decimal basePrice)
        => basePrice * (1 - _discountPercent / 100m);
}
