using MediatR;

namespace Api.Features.Documents.UploadDocument;

public class UploadDocumentHandler: IRequestHandler<UploadDocumentRequest>
{
    public async Task Handle(UploadDocumentRequest request, CancellationToken token)
    {
        await using var ms = new MemoryStream();
        await request.File.CopyToAsync(ms, cancellationToken: token);
    }
}