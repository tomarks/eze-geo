using Domain.Abstractions;
using MediatR;

namespace Api.Features.Documents.UploadDocument;

public sealed record CreateDocumentCommand(
    string DocumentName,
    Guid ParentDirectoryId,
    IFormFile File) : IRequest, IHaveParentDirectory;
