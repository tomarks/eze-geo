using FluentValidation;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.DirectoryNodes;

public class CreateDocumentDirectoryCommandValidator : AbstractValidator<CreateDocumentDirectoryCommand>
{
    public CreateDocumentDirectoryCommandValidator(DocumentsContext db)
    {
        RuleFor(x => new { x.Name, x.ParentDirectoryId }).MustAsync(async (dto, cancellation) =>
        {
            return await db.DirectoryNodes.AnyAsync(x =>
                x.ParentDirectoryId == dto.ParentDirectoryId && x.Name == dto.Name, cancellation);
        }).WithMessage("Name must be unique");
    }
}
