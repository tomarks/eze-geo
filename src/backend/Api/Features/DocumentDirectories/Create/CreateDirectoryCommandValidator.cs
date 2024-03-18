using FluentValidation;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.DocumentDirectories.Create;

public class CreateDirectoryCommandValidator : AbstractValidator<CreateDirectoryOptionCommand>
{
    public CreateDirectoryCommandValidator(DocumentsContext db)
    {
        RuleFor(x => x.Name)
            .NotEmpty();

        RuleFor(x => new { x.Name, x.ParentDirectoryId }).MustAsync(async (dto, cancellation) =>
        {
            return !await db.DirectoryNodes.AsNoTracking().AnyAsync(
                x => x.ParentDirectoryId == dto.ParentDirectoryId && x.Name.Trim().ToLower() == dto.Name.Trim().ToLower(), cancellation);
        }).WithMessage("Name must be unique");
    }
}
