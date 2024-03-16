using Api.Constants;
using FluentValidation;

namespace Api.Features.Documents.UploadDocument;

public class CreateDocumentCommandValidator : AbstractValidator<CreateDocumentCommand>
{
    public CreateDocumentCommandValidator()
    {
        RuleFor(x => x.DocumentName).NotEmpty();
        RuleFor(x => x.ParentDirectoryId).NotNull();
        RuleFor(x => x.File).NotNull();
    }

    public static bool IsSupportedFileType(string fileName)
    {
        var extension = Path.GetExtension(fileName);
        return ValidationConstants.AllowedDocumentFileExtensions.Any(x => string.Equals(x, extension, StringComparison.OrdinalIgnoreCase));
    }
}
