using Domain.Abstractions;

namespace Api.Features.Documents.CreateDocument;

public class DocumentCreatedResponse: IEntity
{
    public Guid Id { get; init; }
}
