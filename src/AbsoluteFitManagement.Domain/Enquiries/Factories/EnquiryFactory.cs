using AbsoluteFitManagement.Domain.Common.Factories;

namespace AbsoluteFitManagement.Domain.Enquiries.Factories;

public class EnquiryFactory : EntityFactory<Enquiry>
{
    public Enquiry Create(
        Guid gymId,
        string fullName,
        string countryCode,
        string contactNumber,
        string? email,
        string? gender,
        string trialType,
        DateTime enquiryDate,
        string serviceName,
        string? leadSource,
        string? followUpStaffName,
        DateTime? followUpDateTime,
        string? callTag,
        string? message,
        DateTime? trialScheduledAt,
        string? trialService,
        string? trialStaffName,
        string? trialClass,
        string? trialSession,
        Guid? id = null)
    {
        var enquiry = new Enquiry(
            gymId, fullName, countryCode, contactNumber, email, gender,
            trialType, enquiryDate, serviceName, leadSource,
            followUpStaffName, followUpDateTime, callTag, message,
            trialScheduledAt, trialService, trialStaffName, trialClass, trialSession, id);
        OnCreated(enquiry);
        return enquiry;
    }
}
