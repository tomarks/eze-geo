using Domain.Abstractions;
using MediatR;

namespace Api.Features.Documents.DeleteDocument;

public class DeleteDocumentCommand: IRequest, IEntity
{
    public Guid Id { get; init; }
}