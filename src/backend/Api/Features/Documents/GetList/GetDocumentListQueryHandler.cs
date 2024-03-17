using Domain.Entities;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Documents.GetList;

// TODO Add pagination (return IPagedResult<T>)
public class GetDocumentListQueryHandler(DocumentsContext db) : IRequestHandler<GetDocumentListQuery, GetDocumentListResponse>
{
    public async Task<GetDocumentListResponse> Handle(GetDocumentListQuery request, CancellationToken cancellationToken)
    {
        var query = db.Documents.AsNoTracking();
        query = ApplyCriteria(request, query);
        query = ApplySorting(query);

        var documents = await query.Select(x => x.ToListDto()).ToListAsync(cancellationToken);

        return new GetDocumentListResponse { Items = documents };
    }


    private IQueryable<Document> ApplyCriteria(GetDocumentListQuery request, IQueryable<Document> queryable)
    {
        // Parent 
        if (request.ParentDirectoryId.HasValue)
            queryable = queryable.Where(x => x.ParentDirectoryId == request.ParentDirectoryId);

        return queryable;
    }


    private IQueryable<Document> ApplySorting(IQueryable<Document> queryable)
    {
        return queryable.OrderBy(x => x.Name);
    }
}
