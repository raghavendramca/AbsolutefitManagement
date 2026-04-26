namespace AbsoluteFitManagement.Infrastructure.Navigation.Persistence;

/// <summary>
/// Fixed GUIDs for QuickAddMenuItem seed data — never change after first deployment.
/// </summary>
internal static class QuickAddMenuSeedIds
{
    internal static readonly Guid Enquiry   = new("2a000001-0000-0000-0000-000000000000");
    internal static readonly Guid Member    = new("2a000002-0000-0000-0000-000000000000");
    internal static readonly Guid Staff     = new("2a000003-0000-0000-0000-000000000000");
    internal static readonly Guid Inventory = new("2a000004-0000-0000-0000-000000000000");
    internal static readonly Guid Expense   = new("2a000005-0000-0000-0000-000000000000");
    internal static readonly Guid Estimate  = new("2a000006-0000-0000-0000-000000000000");
    internal static readonly Guid Invoice   = new("2a000007-0000-0000-0000-000000000000");
    internal static readonly Guid Support   = new("2a000008-0000-0000-0000-000000000000");
}
