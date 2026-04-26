using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Training;

public class SessionBooking : AuditableEntity
{
    public Guid SessionId { get; init; }
    public Guid MemberId { get; init; }

    // Booked | Attended | Absent | Cancelled
    public string BookingStatus { get; set; } = "Booked";

    public SessionBooking(Guid sessionId, Guid memberId, Guid? id = null)
        : base(id ?? Guid.NewGuid())
    {
        SessionId = sessionId;
        MemberId = memberId;
        BookingStatus = "Booked";
    }

    protected SessionBooking() { }
}
