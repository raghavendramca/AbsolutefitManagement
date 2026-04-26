namespace AbsoluteFitManagement.Domain.Finance;

public class Expense
{
    public Guid Id { get; init; }
    public Guid GymId { get; init; }
    public Guid? CategoryId { get; init; }
    public Guid? StaffId { get; init; }           // paid to / incurred by

    public string Title { get; set; } = null!;
    public decimal Amount { get; set; }
    public DateOnly ExpenseDate { get; set; }

    // Cash | Card | UPI | BankTransfer | Other
    public string? PaymentMode { get; set; }
    public string? Reference { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; init; }

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
    {
        Id = id ?? Guid.NewGuid();
        GymId = gymId;
        CategoryId = categoryId;
        StaffId = staffId;
        Title = title;
        Amount = amount;
        ExpenseDate = expenseDate;
        PaymentMode = paymentMode;
        Reference = reference;
        Notes = notes;
        CreatedAt = DateTime.UtcNow;
    }

    public Expense() { }
}
