using Domain.Abstractions;
using MediatR;

namespace Api.Features.Documents.GetList;

public class GetDocumentListQuery: IRequest<GetDocumentListResponse>, IHaveParentDirectoryOption
{
    public Guid? ParentDirectoryId { get; init; }
}
