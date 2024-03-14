namespace Domain.Entities;

public sealed class Folder: Entity
{
    public Guid Id { get; private set; } = new Guid();
    public Guid? ParentId { get; init; }
}