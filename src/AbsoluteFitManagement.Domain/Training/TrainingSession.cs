using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Training;

public class TrainingSession : GymScopedEntity
{
    public Guid ClassId { get; init; }
    public Guid TrainerId { get; init; }
    public Guid? RoomId { get; init; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }

    // Scheduled | Ongoing | Completed | Cancelled
    public string Status { get; set; } = "Scheduled";
    public string? Notes { get; set; }

    public TrainingSession(
        Guid gymId,
        Guid classId,
        Guid trainerId,
        DateTime startDateTime,
        DateTime endDateTime,
        Guid? roomId = null,
        string? notes = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        ClassId = classId;
        TrainerId = trainerId;
        RoomId = roomId;
        StartDateTime = startDateTime;
        EndDateTime = endDateTime;
        Status = "Scheduled";
        Notes = notes;
    }

    protected TrainingSession() { }
}
