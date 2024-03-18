using Api.Features.DocumentDirectories.Create;
using Api.Features.DocumentDirectories.GetStructure;
using Domain.Entities;

namespace Api.Features.DocumentDirectories.Common;

public static class DocumentDirectoryExtensions
{
    public static DirectoryOptionNode ToEntity(this CreateDirectoryOptionCommand dto)
    {
        return new DirectoryOptionNode
        {
            Id = Guid.NewGuid(),
            ParentDirectoryId = dto.ParentDirectoryId,
            Name = dto.Name
        };
    }

    public static DocumentDirectoryOptionDto ToDto(this DirectoryOptionNode optionNode)
    {
        return new DocumentDirectoryOptionDto
        {
            Id = optionNode.Id,
            ParentDirectoryId = optionNode.ParentDirectoryId,
            Name = optionNode.Name
        };
    }
}
