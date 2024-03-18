using Domain.Abstractions;
using MediatR;

namespace Api.Features.Documents.CreateDocument;

public sealed record CreateDocumentCommand(
    Guid ParentDirectoryId,
    IFormFile File) : IRequest<DocumentCreatedResponse>, IHaveParentDirectory;
