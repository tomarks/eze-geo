using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class DirectoryNodeConfiguration : IEntityTypeConfiguration<DirectoryNode>
{
    public void Configure(EntityTypeBuilder<DirectoryNode> builder)
    {
        builder.ToTable("DirectoryNodes");
        builder.HasKey(d => d.Id);
        builder.Property(d => d.Name)
            .IsRequired()
            .HasMaxLength(255);

 
   
    }
}