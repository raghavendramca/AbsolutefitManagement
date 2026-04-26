using AbsoluteFitManagement.Domain.Training;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Training.Persistence;

public class TrainingSessionConfiguration : IEntityTypeConfiguration<TrainingSession>
{
    public void Configure(EntityTypeBuilder<TrainingSession> builder)
    {
        builder.ToTable("TrainingSessions");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.ClassId);
        builder.Property(x => x.TrainerId);
        builder.Property(x => x.RoomId);
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("Scheduled");
        builder.Property(x => x.Notes).HasMaxLength(500);
        builder.HasIndex(x => x.GymId);
        builder.HasIndex(x => x.ClassId);
    }
}
