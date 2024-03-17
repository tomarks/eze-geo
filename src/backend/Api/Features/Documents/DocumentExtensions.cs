using Api.Features.Documents.GetItem;
using Api.Features.Documents.GetList;
using Api.Features.Documents.UploadDocument;
using Domain.Entities;

namespace Api.Features.Documents;

public static class DocumentExtensions
{
    public static async Task<Document> ToEntityAsync(this CreateDocumentCommand command)
    {
        await using var ms = new MemoryStream();
        await command.File.CopyToAsync(ms);

        var fileInfo = new FileInfo(command.File.FileName);

        return new Document
        {
            Id = Guid.NewGuid(),
            ParentDirectoryId = command.ParentDirectoryId,
            Name = fileInfo.Name,
            Extension = fileInfo.Extension,
            Data = ms.ToArray()
        };
    }

    public static DocumentCreatedResponse ToResponse(this Document document)
    {
        return new DocumentCreatedResponse { Id = document.Id };
    }

    public static DocumentListDto ToListDto(this Document document)
    {
        return new DocumentListDto
        {
            Id = document.Id,
            Extension = document.Extension,
            ParentDirectoryId = document.ParentDirectoryId,
            Name = document.Name
        };
    }

    public static DocumentItemDto ToItemDto(this Document document)
    {
        return new DocumentItemDto
        {
            Id = document.Id,
            Extension = document.Extension,
            ParentDirectoryId = document.ParentDirectoryId,
            Data = document.Data,
            Name = document.Name
        };
    }
}
