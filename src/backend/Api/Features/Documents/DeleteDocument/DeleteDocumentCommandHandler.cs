using Infrastructure;
using MediatR;

namespace Api.Features.Documents.DeleteDocument;

public class DeleteDocumentCommandHandler(DocumentsContext db) : IRequestHandler<DeleteDocumentCommand>
{
    public async Task Handle(DeleteDocumentCommand command, CancellationToken cancellationToken)
    {
        var document = await db.Documents.FindAsync(command.Id);

        db.Documents.Remove(document);

        var result = await db.SaveChangesAsync();
    }
}