using Infrastructure;
using MediatR;

namespace Api.Features.DirectoryNodes;

public class CreateDirectoryCommandHandler(DocumentsContext db) : IRequestHandler<CreateDirectoryCommand, DocumentDirectoryDto>
{
    public async Task<DocumentDirectoryDto> Handle(CreateDirectoryCommand request,
        CancellationToken cancellation)
    {
        var entity = request.ToEntity();

        await db.DirectoryNodes.AddAsync(entity, cancellation);

        var result = await db.SaveChangesAsync(cancellationToken: cancellation);

        return entity.ToDto();
    }
}
