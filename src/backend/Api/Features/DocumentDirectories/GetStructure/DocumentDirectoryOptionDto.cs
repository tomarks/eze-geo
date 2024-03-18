using Domain.Abstractions;

namespace Api.Features.DocumentDirectories.GetStructure;

public class DocumentDirectoryOptionDto : IEntity, IHaveParentDirectoryOption
{
    public Guid Id { get; init; }
    public Guid? ParentDirectoryId { get; set; }
    public string Name { get; init; } = null!;

    public List<DocumentDirectoryOptionDto> Directories { get; set; } = new();
}
