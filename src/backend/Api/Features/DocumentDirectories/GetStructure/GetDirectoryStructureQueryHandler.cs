using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.DirectoryNodes.GetStructure;

public class GetDirectoryStructureQueryHandler
    (DocumentsContext db, ILogger<GetDirectoryStructureQueryHandler> logger) : IRequestHandler<
        GetDirectoryStructureQuery, DirectoryStructure>
{
    public async Task<DirectoryStructure> Handle(GetDirectoryStructureQuery request,
        CancellationToken token)
    {
        var directories = await db.DirectoryNodes.ToListAsync(token);
        var roots = directories.Where(x => x.ParentDirectoryId is null).Select(x => x.ToDto()).ToList();

        if (!roots.Any())
            return new DirectoryStructure();

        var children = directories.Where(x => x.ParentDirectoryId is not null).Select(x => x.ToDto()).ToList();

        return new DirectoryStructure
        {
            RootDirectories = roots.Select(x => MapChildren(x, children)).ToList()
        };

        // TODO: Fix PERFORMANCE/TIME COMPLEXITY ISSUE
        // Refactor to improve performance here. Remove nodes from the input list as we add them?
        DocumentDirectoryDto MapChildren(DocumentDirectoryDto node, IEnumerable<DocumentDirectoryDto> nodes)
        {
            node.Directories = nodes
                .Where(x => x.ParentDirectoryId == node.Id)
                .Select(x => MapChildren(x, nodes))
                .ToList();

            return node;
        }
    }
}