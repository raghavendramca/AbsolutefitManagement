namespace AbsoluteFitManagement.Domain.Training;

public class SessionBooking
{
    public Guid Id { get; init; }
    public Guid SessionId { get; init; }
    public Guid MemberId { get; init; }

    // Booked | Attended | Absent | Cancelled
    public string BookingStatus { get; set; } = "Booked";
    public DateTime CreatedAt { get; init; }

    public SessionBooking(Guid sessionId, Guid memberId, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        SessionId = sessionId;
        MemberId = memberId;
        BookingStatus = "Booked";
        CreatedAt = DateTime.UtcNow;
    }

    public SessionBooking() { }
}
