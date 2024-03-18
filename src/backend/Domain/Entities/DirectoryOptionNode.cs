using Domain.Abstractions;
using Domain.Common;

namespace Domain.Entities;

public sealed class DirectoryOptionNode : Entity, IHaveParentDirectoryOption
{
    public string Name { get; set; } = null!;

    public Guid? ParentDirectoryId { get; set; }

    public ICollection<Document> Documents { get; set; } = new List<Document>();
    
}