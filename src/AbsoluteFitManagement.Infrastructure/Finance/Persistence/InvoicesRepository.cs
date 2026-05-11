using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Finance;
using AbsoluteFitManagement.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Finance.Persistence;

public class InvoicesRepository : IInvoicesRepository
{
    private readonly AbsoluteFitManagementDbContext _db;

    public InvoicesRepository(AbsoluteFitManagementDbContext db) => _db = db;

    public async Task<int> CountByGymAsync(Guid gymId) =>
        await _db.Invoices.CountAsync(i => i.GymId == gymId);

    public async Task AddAsync(Invoice invoice) =>
        await _db.Invoices.AddAsync(invoice);

    public async Task AddItemAsync(InvoiceItem item) =>
        await _db.InvoiceItems.AddAsync(item);
}
