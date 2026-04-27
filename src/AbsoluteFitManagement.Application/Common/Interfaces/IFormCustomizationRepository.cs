using FormCustomizationEntity = AbsoluteFitManagement.Domain.Setup.FormCustomization;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IFormCustomizationRepository
{
    Task<FormCustomizationEntity?> GetByGymIdAndFormTypeAsync(Guid gymId, string formType);
    Task AddAsync(FormCustomizationEntity config);
    Task UpdateAsync(FormCustomizationEntity config);
}
