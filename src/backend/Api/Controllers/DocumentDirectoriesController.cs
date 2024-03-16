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
    [ProducesResponseType(typeof(DirectoryStructure), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetStructure(CancellationToken cancellation)
    {
        var result = await mediator.Send(new GetDirectoryStructureQuery(), cancellation);
        return Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(typeof(DocumentDirectoryDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(CreateDirectoryCommand command, CancellationToken cancellation)
    {
        var result = await mediator.Send(command, cancellation);
        return Ok(result);
    }
}
