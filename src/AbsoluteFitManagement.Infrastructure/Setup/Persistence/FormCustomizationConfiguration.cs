using AbsoluteFitManagement.Domain.Setup;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbsoluteFitManagement.Infrastructure.Setup.Persistence;

public class FormCustomizationConfiguration : IEntityTypeConfiguration<FormCustomization>
{
    public void Configure(EntityTypeBuilder<FormCustomization> builder)
    {
        builder.ToTable("FormCustomizations");
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.FormType).HasMaxLength(100);
        builder.Property(x => x.FieldsJson).HasColumnType("TEXT");
        builder.HasIndex(x => new { x.GymId, x.FormType }).IsUnique();
    }
}
