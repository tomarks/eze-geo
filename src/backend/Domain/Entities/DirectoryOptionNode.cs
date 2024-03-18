using Domain.Abstractions;
using Domain.Common;

namespace Domain.Entities;

public sealed class DirectoryOptionNode : Entity, IHaveParentDirectoryOption
{
    public string Name { get; set; } = null!;
    public Guid? ParentDirectoryId { get; set; }
}
