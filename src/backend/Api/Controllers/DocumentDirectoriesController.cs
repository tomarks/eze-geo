using Api.Features.DirectoryNodes;
using Api.Features.DirectoryNodes.GetStructure;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class DocumentDirectoriesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetStructure(CancellationToken cancellation)
    {
        var result = await mediator.Send(new GetDirectoryStructureQuery(), cancellation);
        return Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Create(CreateDocumentDirectoryCommand command, CancellationToken cancellation)
    {
        var result = await mediator.Send(command, cancellation);
        return Ok(result);
    }
}