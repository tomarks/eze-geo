using FluentValidation;
using MediatR;

namespace Api.Behaviors;

public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>>? _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>>? validators = null)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (_validators?.Any() != true)
        {
            return await next();
        }

        var validationFailures = (await Task.WhenAll(
                _validators.Select(validator => validator.ValidateAsync(request, cancellationToken))))
            .SelectMany(x => x.Errors)
            .Where(x => x is not null)
            .ToList();

        if (validationFailures.Any())
        {
            throw new ValidationException(validationFailures);
        }

        return await next();
    }
}
