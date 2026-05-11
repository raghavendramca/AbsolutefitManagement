using AbsoluteFitManagement.Domain.Finance;

namespace AbsoluteFitManagement.Application.Common.Interfaces;

public interface IInvoicesRepository
{
    Task<int> CountByGymAsync(Guid gymId);
    Task AddAsync(Invoice invoice);
    Task AddItemAsync(InvoiceItem item);
}
