using AbsoluteFitManagement.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Users.Persistence;

public class StudioUserConfiguration : IEntityTypeConfiguration<StudioUser>
{
    public void Configure(EntityTypeBuilder<StudioUser> builder)
    {
        builder.ToTable("StudioUsers");

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.Email)
            .HasMaxLength(256)
            .IsRequired();

        builder.HasIndex(x => x.Email)
            .IsUnique();

        builder.Property(x => x.PasswordHash)
            .HasMaxLength(512)
            .IsRequired();

        builder.Property(x => x.AdminId)
            .IsRequired();
    }
}
