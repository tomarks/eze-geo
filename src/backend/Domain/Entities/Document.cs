namespace Domain.Entities;

public sealed class Document: Entity
{
    public Guid FolderId { get; init; }
    public string Extension { get; init; } = null!;
}