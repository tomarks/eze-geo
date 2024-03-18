using Api.Features.Documents.Common;
using FluentValidation;
using FluentValidation.Results;
using Infrastructure;
using MediatR;

namespace Api.Features.Documents.CreateDocument;

public class CreateDocumentCommandHandler(DocumentsContext db) : IRequestHandler<CreateDocumentCommand, DocumentCreatedResponse>
{
    public async Task<DocumentCreatedResponse> Handle(CreateDocumentCommand command, CancellationToken cancellation)
    {
        // TODO: This is here because fluent validation is not handling this correctly
        if (!CreateDocumentCommandValidator.IsSupportedFileType(command.File.FileName))
            throw new ValidationException(new List<ValidationFailure> { new("File.ContentType", "Invalid File Type", command.File.ContentType) });

        var document = await command.ToEntityAsync();

        db.Documents.Add(document);
        await db.SaveChangesAsync(cancellation);

        return document.ToResponse();
    }
}
