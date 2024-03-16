using Infrastructure;
using MediatR;

namespace Api.Features.DirectoryNodes;

public class CreateDocumentDirectoryCommandHandler
    (DocumentsContext db) : IRequestHandler<CreateDocumentDirectoryCommand, DocumentDirectoryDto>
{
    public async Task<DocumentDirectoryDto> Handle(CreateDocumentDirectoryCommand request, CancellationToken token)
    {
        var entity = request.ToEntity();

        await db.DirectoryNodes.AddAsync(entity, token);

        var result = await db.SaveChangesAsync(cancellationToken: token);

        return entity.ToDto();
    }
}