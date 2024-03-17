using Domain.Abstractions;
using MediatR;

namespace Api.Features.Documents.GetList;

public class GetDocumentListQuery: IRequest<GetDocumentListResponse>, ICanHaveParentDirectory
{
    public Guid? ParentDirectoryId { get; init; }
}
