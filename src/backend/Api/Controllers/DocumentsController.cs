using Api.Features.Documents.UploadDocument;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task UploadDocument([FromForm] CreateDocumentCommand command, CancellationToken cancellation)
        => await mediator.Send(command, cancellation);
}
