using GymManagement.Domain.Gyms;
using GymManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GymManagement.Infrastructure.Gyms.Persistence;

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
    }
}