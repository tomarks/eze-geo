using Domain.Abstractions;
using MediatR;

namespace Api.Features.Documents.GetItem;

public class GetDocumentQuery : IEntity, IRequest<DocumentItemDto>
{
    public Guid Id { get; init; }
}
