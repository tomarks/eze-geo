using Api.Features.Documents.UploadDocument;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(DocumentCreatedResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task UploadDocument([FromForm] CreateDocumentCommand command, CancellationToken cancellation)
        => await mediator.Send(command, cancellation);
}
