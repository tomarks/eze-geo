using Domain.Abstractions;
using MediatR;

namespace Api.Features.DirectoryNodes;

public class CreateDocumentDirectoryCommand: IRequest<DocumentDirectoryDto>, ICanHaveParentDirectory
{
    public string Name { get; set; } = null!;
    public Guid? ParentDirectoryId { get; set; }
}