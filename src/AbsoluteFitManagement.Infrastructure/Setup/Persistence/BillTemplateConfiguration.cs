using AbsoluteFitManagement.Domain.Setup;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class BillTemplateConfiguration : IEntityTypeConfiguration<BillTemplate>
{
    public void Configure(EntityTypeBuilder<BillTemplate> builder)
    {
        builder.ToTable("BillTemplates");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.State).HasMaxLength(100);
        builder.Property(x => x.GstNumber).HasMaxLength(50);
        builder.Property(x => x.BusinessName).HasMaxLength(300);
        builder.Property(x => x.TemplateJson);
        builder.HasIndex(x => x.GymId);
    }
}
