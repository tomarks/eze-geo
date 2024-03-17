namespace Api.Features.Documents.GetList;

public class GetDocumentListResponse
{
    public IEnumerable<DocumentListDto> Items { get; set; } = Enumerable.Empty<DocumentListDto>();
}
