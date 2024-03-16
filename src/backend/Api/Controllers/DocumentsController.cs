using Api.Features.Documents.DeleteDocument;
using Api.Features.Documents.UploadDocument;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class DocumentsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task UploadFile([FromForm] CreateDocumentCommand command, CancellationToken cancellation)
        => await mediator.Send(command, cancellation);

    [HttpDelete("{id}")]
    public async Task DeleteFile([FromQuery] DeleteDocumentCommand command, CancellationToken cancellation)
        => await mediator.Send(command, cancellation);
}
