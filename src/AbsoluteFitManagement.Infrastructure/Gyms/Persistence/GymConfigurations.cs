using AbsoluteFitManagement.Domain.Gyms;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Gyms.Persistence;

public class GymConfigurations : IEntityTypeConfiguration<Gym>
{
    public void Configure(EntityTypeBuilder<Gym> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property("_maxRooms")
            .HasColumnName("MaxRooms");

        builder.Property<List<Guid>>("_roomIds")
            .HasColumnName("RoomIds")
            .HasListOfIdsConverter();

        builder.Property<List<Guid>>("_trainerIds")
            .HasColumnName("TrainerIds")
            .HasListOfIdsConverter();

        builder.Property(x => x.Name);

        builder.Property(x => x.SubscriptionId);

        builder.Property(x => x.TenantId);

        builder.Property(x => x.Locality)
            .HasMaxLength(200)
            .HasDefaultValue(string.Empty);

        builder.Property(x => x.City)
            .HasMaxLength(200)
            .HasDefaultValue(string.Empty);

        builder.Property(x => x.BranchCode)
            .HasDefaultValue(0);
    }
}