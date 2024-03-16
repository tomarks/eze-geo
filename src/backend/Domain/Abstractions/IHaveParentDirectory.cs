namespace Domain.Abstractions;

public interface IHaveParentDirectory
{
    public Guid ParentDirectoryId { get; set; }
}