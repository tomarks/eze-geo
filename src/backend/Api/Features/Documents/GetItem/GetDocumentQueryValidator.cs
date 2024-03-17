using FluentValidation;
using Infrastructure;

namespace Api.Features.Documents.GetItem;

public class GetDocumentQueryValidator : AbstractValidator<GetDocumentQuery>
{
    public GetDocumentQueryValidator(DocumentsContext db)
    {
        RuleFor(x => x.Id).NotNull();

        RuleFor(x => x.Id).MustAsync(async (id, cancellation) =>
        {
            db.ChangeTracker.AutoDetectChangesEnabled = false;
            var document = await db.Documents.FindAsync(id, cancellation);
            return document is null;
        }).WithMessage("Document Not Found");
    }
}
