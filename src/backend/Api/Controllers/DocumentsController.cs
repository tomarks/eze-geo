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
    public async Task GetList([FromQuery] GetDocumentListQuery query, CancellationToken cancellation)
        => await mediator.Send(query, cancellation);

    [HttpPost]
    [ProducesResponseType(typeof(DocumentCreatedResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task UploadDocument([FromForm] CreateDocumentCommand command, CancellationToken cancellation)
        => await mediator.Send(command, cancellation);
}
