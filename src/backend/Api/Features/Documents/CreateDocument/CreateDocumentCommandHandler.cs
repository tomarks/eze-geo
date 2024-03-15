using Api.Constants;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace Api.Features.Documents.UploadDocument;

public class CreateDocumentCommandHandler : IRequestHandler<CreateDocumentCommand>
{
    public async Task Handle(CreateDocumentCommand command, CancellationToken cancellation)
    {
        // TODO: This is here because fluent validation is not handling this correctly
        if (!CreateDocumentCommandValidator.IsSupportedFileType(command.File.FileName))
            throw new ValidationException(new List<ValidationFailure> { new("File.ContentType", "Invalid File Type", command.File.ContentType) });

        await using var ms = new MemoryStream();
        await command.File.CopyToAsync(ms, cancellationToken: cancellation);
    }
}
