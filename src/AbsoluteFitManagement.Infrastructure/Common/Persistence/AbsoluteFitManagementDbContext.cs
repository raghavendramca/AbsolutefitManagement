using System.Reflection;
using AbsoluteFitManagement.Application.Common.Interfaces;
using AbsoluteFitManagement.Domain.Admins;
using AbsoluteFitManagement.Domain.Gyms;
using AbsoluteFitManagement.Domain.Navigation;
using AbsoluteFitManagement.Domain.Subscriptions;
using AbsoluteFitManagement.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace AbsoluteFitManagement.Infrastructure.Common.Persistence;

public class AbsoluteFitManagementDbContext : DbContext, IUnitOfWork
{
    public DbSet<Admin> Admins { get; set; } = null!;
    public DbSet<Subscription> Subscriptions { get; set; } = null!;
    public DbSet<Gym> Gyms { get; set; } = null!;
    public DbSet<LoginOption> LoginOptions { get; set; } = null!;
    public DbSet<StudioUser> StudioUsers { get; set; } = null!;

    public AbsoluteFitManagementDbContext(DbContextOptions options) : base(options)
    {
    }

    public async Task CommitChangesAsync()
    {
        await SaveChangesAsync();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}