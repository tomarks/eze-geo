using Domain.Entities;

namespace Api.Features.DirectoryNodes;

public static class DirectoryNodeExtensions
{
    public static DirectoryNode ToEntity(this DirectoryNodeCreateRequest dto)
    {
        return new DirectoryNode
        {
            Id = Guid.NewGuid(),
            ParentDirectoryId = dto.ParentDirectoryId,
            Name = dto.Name
        };
    }

    public static DirectoryNodeItemDto ToDto(this DirectoryNode node)
    {
        return new DirectoryNodeItemDto
        {
            Id = node.Id,
            ParentDirectoryId = node.ParentDirectoryId,
            Name = node.Name
        };
    }
}