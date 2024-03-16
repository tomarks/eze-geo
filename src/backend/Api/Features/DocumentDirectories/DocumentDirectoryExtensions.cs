using Domain.Entities;

namespace Api.Features.DirectoryNodes;

public static class DocumentDirectoryExtensions
{
    public static DirectoryNode ToEntity(this CreateDocumentDirectoryCommand dto)
    {
        return new DirectoryNode
        {
            Id = Guid.NewGuid(),
            ParentDirectoryId = dto.ParentDirectoryId,
            Name = dto.Name
        };
    }

    public static DocumentDirectoryDto ToDto(this DirectoryNode node)
    {
        return new DocumentDirectoryDto
        {
            Id = node.Id,
            ParentDirectoryId = node.ParentDirectoryId,
            Name = node.Name
        };
    }
}
