using Domain.Abstractions;

namespace Api.Features.DirectoryNodes;

public class DirectoryNodeCreateRequest: ICanHaveParentDirectory
{
    public string Name { get; set; } = null!;
    public Guid? ParentDirectoryId { get; set; }
}