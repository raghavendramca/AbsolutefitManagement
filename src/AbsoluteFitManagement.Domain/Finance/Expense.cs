using AbsoluteFitManagement.Domain.Common;

namespace AbsoluteFitManagement.Domain.Finance;

public class Expense : GymScopedEntity
{
    public Guid? CategoryId { get; init; }
    public Guid? StaffId { get; init; }
    public string Title { get; set; } = null!;
    public decimal Amount { get; set; }
    public DateOnly ExpenseDate { get; set; }

    // Cash | Card | UPI | BankTransfer | Other
    public string? PaymentMode { get; set; }
    public string? Reference { get; set; }
    public string? Notes { get; set; }

    public Expense(
        Guid gymId,
        string title,
        decimal amount,
        DateOnly expenseDate,
        Guid? categoryId = null,
        Guid? staffId = null,
        string? paymentMode = null,
        string? reference = null,
        string? notes = null,
        Guid? id = null)
        : base(id ?? Guid.NewGuid(), gymId)
    {
        CategoryId = categoryId;
        StaffId = staffId;
        Title = title;
        Amount = amount;
        ExpenseDate = expenseDate;
        PaymentMode = paymentMode;
        Reference = reference;
        Notes = notes;
    }

    protected Expense() { }
}
