using System.ComponentModel;
using Api.Features.DocumentDirectories.GetStructure;
using Domain.Abstractions;
using MediatR;

namespace Api.Features.DocumentDirectories.Create;

public class CreateDirectoryOptionCommand : IRequest<DocumentDirectoryOptionDto>, IHaveParentDirectoryOption
{
    [DefaultValue("Home")]
    public string Name { get; init; } = null!;

    [DefaultValue(null)]
    public Guid? ParentDirectoryId { get; init; }
}
