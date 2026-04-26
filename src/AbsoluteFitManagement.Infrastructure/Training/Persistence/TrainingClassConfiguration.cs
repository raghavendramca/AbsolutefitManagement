using AbsoluteFitManagement.Domain.Training;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Training.Persistence;

public class TrainingClassConfiguration : IEntityTypeConfiguration<TrainingClass>
{
    public void Configure(EntityTypeBuilder<TrainingClass> builder)
    {
        builder.ToTable("TrainingClasses");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.GymId);
        builder.Property(x => x.Name).HasMaxLength(200);
        builder.Property(x => x.Description).HasMaxLength(500);
        builder.Property(x => x.IsActive).HasDefaultValue(true);
        builder.HasIndex(x => x.GymId);
    }
}
