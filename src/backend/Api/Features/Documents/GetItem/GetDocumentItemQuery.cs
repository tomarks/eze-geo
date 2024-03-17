using Domain.Abstractions;
using MediatR;

namespace Api.Features.Documents.GetItem;

public class GetDocumentItemQuery : IEntity, IRequest<DocumentItemDto>
{
    public Guid Id { get; init; }
}
