using Api.Features.Documents.GetItem;
using Api.Features.Documents.GetList;
using Api.Features.Documents.UploadDocument;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentsController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(GetDocumentListResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetList([FromQuery] GetDocumentListQuery query, CancellationToken cancellation)
    {
        var result = await mediator.Send(query, cancellation);
        return Ok(result);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(DocumentItemDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetItem([FromRoute] Guid id, CancellationToken cancellation)
    {
        var result = await mediator.Send(new GetDocumentItemQuery { Id = id }, cancellation);
        return Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(typeof(DocumentCreatedResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UploadDocument([FromForm] CreateDocumentCommand command, CancellationToken cancellation)
    {
        var result = await mediator.Send(command, cancellation);
        return Ok(result);
    }
}
