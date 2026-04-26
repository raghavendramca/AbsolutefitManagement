namespace AbsoluteFitManagement.Domain.Members.Strategies;

public interface IMembershipPricingStrategy
{
    decimal CalculateFinalPrice(decimal basePrice);
}
