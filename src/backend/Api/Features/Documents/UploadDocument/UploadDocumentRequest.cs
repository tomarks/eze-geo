using MediatR;

namespace Api.Features.Documents.UploadDocument;

public sealed record UploadDocumentRequest(string DocumentName, IFormFile File) : IRequest;