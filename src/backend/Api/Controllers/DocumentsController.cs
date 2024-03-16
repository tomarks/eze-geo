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
    public async Task UploadFile([FromBody] CreateDocumentCommand command, CancellationToken token)
        => await mediator.Send(command, token);

    [HttpDelete("{id}")]
    public async Task DeleteFile([FromQuery] DeleteDocumentCommand command, CancellationToken token)
        => await mediator.Send(command, token);
}