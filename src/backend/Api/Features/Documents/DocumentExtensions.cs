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
}
