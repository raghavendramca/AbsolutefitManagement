using AbsoluteFitManagement.Domain.Training;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Training.Persistence;

public class SessionBookingConfiguration : IEntityTypeConfiguration<SessionBooking>
{
    public void Configure(EntityTypeBuilder<SessionBooking> builder)
    {
        builder.ToTable("SessionBookings");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.SessionId);
        builder.Property(x => x.MemberId);
        builder.Property(x => x.BookingStatus).HasMaxLength(20).HasDefaultValue("Booked");
        builder.HasIndex(x => x.SessionId);
        builder.HasIndex(x => x.MemberId);
        builder.HasIndex(x => new { x.SessionId, x.MemberId }).IsUnique();
    }
}
