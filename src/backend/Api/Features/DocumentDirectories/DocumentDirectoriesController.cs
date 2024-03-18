using Api.Features.DocumentDirectories.Create;
using Api.Features.DocumentDirectories.GetStructure;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.DocumentDirectories;

[ApiController]
[Route("api/[controller]")]
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
    [ProducesResponseType(typeof(DocumentDirectoryOptionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(CreateDirectoryOptionCommand optionCommand, CancellationToken cancellation)
    {
        var result = await mediator.Send(optionCommand, cancellation);
        return Ok(result);
    }
}
