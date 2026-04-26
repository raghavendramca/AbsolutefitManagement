namespace AbsoluteFitManagement.Domain.Members.Strategies;

public class DiscountedMembershipPricingStrategy : IMembershipPricingStrategy
{
    private readonly decimal _discountPercent;

    public DiscountedMembershipPricingStrategy(decimal discountPercent)
        => _discountPercent = discountPercent;

    public decimal CalculateFinalPrice(decimal basePrice)
        => basePrice * (1 - _discountPercent / 100m);
}
