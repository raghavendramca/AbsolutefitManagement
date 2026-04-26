using AbsoluteFitManagement.Domain.Members;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Members.Persistence;

public class MemberConfiguration : IEntityTypeConfiguration<Member>
{
    public void Configure(EntityTypeBuilder<Member> builder)
    {
        builder.ToTable("Members");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.EnquiryId);
        builder.Property(x => x.FullName).HasMaxLength(200);
        builder.Property(x => x.CountryCode).HasMaxLength(10);
        builder.Property(x => x.ContactNumber).HasMaxLength(20);
        builder.Property(x => x.Email).HasMaxLength(200);
        builder.Property(x => x.Gender).HasMaxLength(10);
        builder.Property(x => x.Address).HasMaxLength(500);
        builder.Property(x => x.EmergencyContactName).HasMaxLength(200);
        builder.Property(x => x.EmergencyContactPhone).HasMaxLength(20);
        builder.Property(x => x.PhotoUrl).HasMaxLength(500);
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Active");
        builder.HasIndex(x => x.GymId);
        builder.HasIndex(x => x.EnquiryId);
    }
}
