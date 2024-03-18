using Api.Features.DocumentDirectories.Common;
using Api.Features.DocumentDirectories.GetStructure;
using Infrastructure;
using MediatR;

namespace Api.Features.DocumentDirectories.Create;

public class CreateDirectoryCommandHandler(DocumentsContext db) : IRequestHandler<CreateDirectoryOptionCommand, DocumentDirectoryOptionDto>
{
    public async Task<DocumentDirectoryOptionDto> Handle(CreateDirectoryOptionCommand request,
        CancellationToken cancellation)
    {
        var entity = request.ToEntity();

        await db.DirectoryNodes.AddAsync(entity, cancellation);

        var result = await db.SaveChangesAsync(cancellationToken: cancellation);

        return entity.ToDto();
    }
}
