using Domain.Abstractions;

namespace Api.Features.Documents.UploadDocument;

public class DocumentCreatedResponse: IEntity
{
    public Guid Id { get; init; }
}
