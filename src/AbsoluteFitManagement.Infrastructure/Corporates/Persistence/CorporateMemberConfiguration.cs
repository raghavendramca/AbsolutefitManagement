using AbsoluteFitManagement.Domain.Corporates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Corporates.Persistence;

public class CorporateMemberConfiguration : IEntityTypeConfiguration<CorporateMember>
{
    public void Configure(EntityTypeBuilder<CorporateMember> builder)
    {
        builder.ToTable("CorporateMembers");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.CorporateId);
        builder.Property(x => x.MemberId);
        builder.HasIndex(x => x.CorporateId);
        builder.HasIndex(x => x.MemberId);
        builder.HasIndex(x => new { x.CorporateId, x.MemberId }).IsUnique();
    }
}
