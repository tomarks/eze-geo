using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class DocumentConfiguration : IEntityTypeConfiguration<Document>
{
    public void Configure(EntityTypeBuilder<Document> builder)
    {
        builder.ToTable("Documents");

        builder.HasKey(d => d.Id);

        builder.Property(d => d.Name)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(d => d.Extension)
            .IsRequired()
            .HasMaxLength(10);

        builder.Property(d => d.Data)
            .IsRequired();

        builder.Property(d => d.ParentDirectoryId)
            .IsRequired();

        builder
            .HasOne(d => d.ParentDirectory)
            .WithMany(d => d.Documents)
            .HasForeignKey(d => d.ParentDirectoryId)
            .IsRequired();
    }
}