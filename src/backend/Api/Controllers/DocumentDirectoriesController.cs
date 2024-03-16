using Api.Features.DirectoryNodes;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class DocumentDirectoriesController(DocumentsContext db) : ControllerBase
{
// TODO: Move logic to mediatr
    [HttpGet]
    public async Task<IEnumerable<DirectoryNodeItemDto>> GetList(CancellationToken token)
        => await db.DirectoryNodes.Select(x => x.ToDto()).ToListAsync(token);

// TODO: Move logic to mediatr
    [HttpGet("{id}")]
    public async Task<DirectoryNodeItemDto> GetItem([FromQuery] Guid id, CancellationToken token)
    {
        var node = await db.DirectoryNodes.FindAsync(id, token);
        return node.ToDto();
    }

// TODO: Move logic to mediatr
    [HttpPost]
    public async Task<DirectoryNodeItemDto> CreateNode(DirectoryNodeCreateRequest request, CancellationToken token)
    {
        var entity = request.ToEntity();
        await db.DirectoryNodes.AddAsync(entity, token);
        var result = await db.SaveChangesAsync();
        return entity.ToDto();
    }
}