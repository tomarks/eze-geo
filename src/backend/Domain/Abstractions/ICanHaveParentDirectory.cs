namespace Domain.Abstractions;

/// <summary>
/// Defines an interface that has a reference to a parent directory.
/// </summary>
public interface ICanHaveParentDirectory
{
    /// <summary>
    /// Gets or sets the unique identifier of the parent directory. Use an Empty/Default Guid for a root directory.
    /// </summary>
    public Guid? ParentDirectoryId { get; set; }
}
