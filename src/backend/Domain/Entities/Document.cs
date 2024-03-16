using Domain.Abstractions;
using Domain.Common;

namespace Domain.Entities;

public sealed class Document : Entity, IHaveParentDirectory
{
    public string Name { get; init; } = null!;
    public string Extension { get; init; } = null!;
    public byte[] Data { get; init; } = null!;

    public Guid ParentDirectoryId { get; set; }
    public DirectoryNode ParentDirectory { get; set; }
}