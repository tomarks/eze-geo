using Domain.Abstractions;
using MediatR;

namespace Api.Features.Documents.UploadDocument;

public sealed record CreateDocumentCommand(
    Guid ParentDirectoryId,
    IFormFile File) : IRequest<DocumentCreatedResponse>, IHaveParentDirectory;
