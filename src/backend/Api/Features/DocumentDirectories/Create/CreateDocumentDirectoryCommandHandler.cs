using Infrastructure;
using MediatR;

namespace Api.Features.DirectoryNodes;

public class CreateDocumentDirectoryCommandHandler(DocumentsContext db) : IRequestHandler<CreateDocumentDirectoryCommand, DocumentDirectoryDto>
{
    public async Task<DocumentDirectoryDto> Handle(CreateDocumentDirectoryCommand request,
        CancellationToken cancellation)
    {
        var entity = request.ToEntity();

        await db.DirectoryNodes.AddAsync(entity, cancellation);

        var result = await db.SaveChangesAsync(cancellationToken: cancellation);

        return entity.ToDto();
    }
}
