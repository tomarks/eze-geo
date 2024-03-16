using Domain.Abstractions;
using Domain.Common;

namespace Domain.Entities;

public sealed class DirectoryNode : Entity, IHasParentDirectory
{
    public string Name { get; set; } = null!;

    public Guid ParentDirectoryId { get; set; }
    public DirectoryNode? ParentDirectory { get; set; }

    public ICollection<Document> Documents { get; set; } = new List<Document>();
    public ICollection<DirectoryNode> DirectoryNodes { get; set; } = new List<DirectoryNode>();
}