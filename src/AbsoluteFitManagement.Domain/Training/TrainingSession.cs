namespace AbsoluteFitManagement.Domain.Training;

public class TrainingSession
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public Guid ClassId { get; init; }
    public Guid TrainerId { get; init; }           // FK to StaffMember
    public Guid? RoomId { get; init; }

    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }

    // Scheduled | Ongoing | Completed | Cancelled
    public string Status { get; set; } = "Scheduled";
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; init; }

    public TrainingSession(
        Guid gymId,
        Guid classId,
        Guid trainerId,
        DateTime startDateTime,
        DateTime endDateTime,
        Guid? roomId = null,
        string? notes = null,
        Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        ClassId = classId;
        TrainerId = trainerId;
        RoomId = roomId;
        StartDateTime = startDateTime;
        EndDateTime = endDateTime;
        Status = "Scheduled";
        Notes = notes;
        CreatedAt = DateTime.UtcNow;
    }

    public TrainingSession() { }
}
