using AbsoluteFitManagement.Domain.Admins;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Admins.Persistence;

public class AdminConfiguration : IEntityTypeConfiguration<Admin>
{
    public void Configure(EntityTypeBuilder<Admin> builder)
    {
        builder.ToTable("Admins");

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.HasData(new Admin(
            userId: Guid.NewGuid(),
            id: Guid.Parse("0c97fb2a-479e-44b1-9353-dea3d9f418e1")));
    }
}