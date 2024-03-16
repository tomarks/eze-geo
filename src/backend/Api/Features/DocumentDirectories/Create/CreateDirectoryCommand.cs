using System.ComponentModel;
using Domain.Abstractions;
using MediatR;

namespace Api.Features.DirectoryNodes;

public class CreateDirectoryCommand : IRequest<DocumentDirectoryDto>, ICanHaveParentDirectory
{
    [DefaultValue("Home")]
    public string Name { get; init; } = null!;

    [DefaultValue(null)]
    public Guid? ParentDirectoryId { get; init; }
}
