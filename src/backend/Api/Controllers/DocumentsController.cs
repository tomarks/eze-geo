using Api.Features.Documents.UploadDocument;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class DocumentsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task UploadFile([FromBody] UploadDocumentRequest request, CancellationToken token)
        => await mediator.Send(request, token);
}