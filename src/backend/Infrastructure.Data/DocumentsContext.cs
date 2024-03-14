using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class DocumentsContext: DbContext
{
    public DocumentsContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<Document> Documents => Set<Document>();
    public DbSet<Folder> Folders => Set<Folder>();
}