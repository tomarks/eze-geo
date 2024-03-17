using FluentValidation;
using FluentValidation.Results;
using Infrastructure;
using MediatR;

namespace Api.Features.Documents.GetItem;

public class GetDocumentItemQueryHandler(DocumentsContext db) : IRequestHandler<GetDocumentItemQuery, DocumentItemDto>
{
    public async Task<DocumentItemDto> Handle(GetDocumentItemQuery request, CancellationToken cancellationToken)
    {
        var document = await db
            .Documents
            .FindAsync(request.Id);

        if (document is null)
            throw new ValidationException(new List<ValidationFailure> { new("Document", "Not Found") });

        var dto = document.ToItemDto();

        return dto;
    }
}
