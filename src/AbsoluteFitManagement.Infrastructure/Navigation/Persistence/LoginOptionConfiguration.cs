using AbsoluteFitManagement.Domain.Navigation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Navigation.Persistence;

public class LoginOptionConfiguration : IEntityTypeConfiguration<LoginOption>
{
    public void Configure(EntityTypeBuilder<LoginOption> builder)
    {
        builder.HasKey(l => l.Id);
        builder.Property(l => l.Label).IsRequired().HasMaxLength(100);
        builder.Property(l => l.Route).IsRequired().HasMaxLength(200);

        builder.HasData(
            new LoginOption(1, "Member", "/login/member", 1),
            new LoginOption(2, "Studio", "/login/studio", 2)
        );
    }
}
