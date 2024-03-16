using Domain.Abstractions;

namespace Api.Features.DirectoryNodes;

public class DirectoryNodeItemDto: IEntity, ICanHaveParentDirectory
{
    public Guid Id { get; init; }
    public Guid? ParentDirectoryId { get; set; }
    public string Name { get; init; } = null!;
}