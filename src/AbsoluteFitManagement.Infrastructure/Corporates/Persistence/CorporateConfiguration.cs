using AbsoluteFitManagement.Domain.Corporates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Corporates.Persistence;

public class CorporateConfiguration : IEntityTypeConfiguration<Corporate>
{
    public void Configure(EntityTypeBuilder<Corporate> builder)
    {
        builder.ToTable("Corporates");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.CompanyName).HasMaxLength(300);
        builder.Property(x => x.ContactPerson).HasMaxLength(200);
        builder.Property(x => x.Email).HasMaxLength(200);
        builder.Property(x => x.Phone).HasMaxLength(20);
        builder.Property(x => x.Address).HasMaxLength(500);
        builder.Property(x => x.DiscountPercent).HasPrecision(5, 2);
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Active");
        builder.HasIndex(x => x.GymId);
    }
}
