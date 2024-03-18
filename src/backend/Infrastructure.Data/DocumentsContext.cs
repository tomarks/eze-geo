using Domain.Entities;
using Infrastructure.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class DocumentsContext : DbContext
{
    public DocumentsContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Document> Documents => Set<Document>();
    public DbSet<DirectoryOptionNode> DirectoryNodes => Set<DirectoryOptionNode>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DocumentConfiguration).Assembly);
        
    }
}