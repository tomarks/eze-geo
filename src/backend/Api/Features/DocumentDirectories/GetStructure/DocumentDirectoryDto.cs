using Domain.Abstractions;

namespace Api.Features.DirectoryNodes;

public class DocumentDirectoryDto : IEntity, ICanHaveParentDirectory
{
    public Guid Id { get; init; }
    public Guid? ParentDirectoryId { get; set; }
    public string Name { get; init; } = null!;

    public List<DocumentDirectoryDto> Directories { get; set; } = new();
}
