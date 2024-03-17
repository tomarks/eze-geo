using Domain.Abstractions;


namespace Api.Features.Documents.GetItem;

public class DocumentItemDto : IEntity, IHaveParentDirectory
{
    public Guid Id { get; init; }
    public string Name { get; init; } = null!;
    public string Extension { get; init; } = null!;
    public Guid ParentDirectoryId { get; init; }
    public byte[] Data { get; init; }
}
