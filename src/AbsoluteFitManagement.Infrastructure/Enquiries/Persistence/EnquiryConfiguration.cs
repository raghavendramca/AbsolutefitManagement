using AbsoluteFitManagement.Domain.Enquiries;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Enquiries.Persistence;

public class EnquiryConfiguration : IEntityTypeConfiguration<Enquiry>
{
    public void Configure(EntityTypeBuilder<Enquiry> builder)
    {
        builder.ToTable("Enquiries");

        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.FullName).HasMaxLength(200);
        builder.Property(x => x.CountryCode).HasMaxLength(10);
        builder.Property(x => x.ContactNumber).HasMaxLength(20);
        builder.Property(x => x.Email).HasMaxLength(200);
        builder.Property(x => x.Gender).HasMaxLength(10);
        builder.Property(x => x.TrialType).HasMaxLength(30);
        builder.Property(x => x.EnquiryDate);
        builder.Property(x => x.ServiceName).HasMaxLength(200);
        builder.Property(x => x.LeadSource).HasMaxLength(100);
        builder.Property(x => x.FollowUpStaffName).HasMaxLength(200);
        builder.Property(x => x.FollowUpDateTime);
        builder.Property(x => x.CallTag).HasMaxLength(10);
        builder.Property(x => x.Message).HasMaxLength(250);
        builder.Property(x => x.TrialScheduledAt);
        builder.Property(x => x.TrialService).HasMaxLength(200);
        builder.Property(x => x.TrialStaffName).HasMaxLength(200);
        builder.Property(x => x.TrialClass).HasMaxLength(200);
        builder.Property(x => x.TrialSession).HasMaxLength(200);
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Enquiry");
        builder.Property(x => x.CreatedAt);

        builder.HasIndex(x => x.GymId);
    }
}
