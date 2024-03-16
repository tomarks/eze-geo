using MediatR;

namespace Api.Features.Documents.UploadDocument;

public class CreateDocumentCommandHandler : IRequestHandler<CreateDocumentCommand>
{
    public async Task Handle(CreateDocumentCommand command, CancellationToken cancellation)
    {
        var fileExtension = Path.GetExtension(command.File.Name);

        await using var ms = new MemoryStream();
        await command.File.CopyToAsync(ms, cancellationToken: cancellation);
    }
}
