using Ardalis.GuardClauses;
using Microsoft.EntityFrameworkCore;

// ReSharper disable once CheckNamespace
namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services,
        Action<IServiceProvider, DbContextOptionsBuilder> optionsAction)
    {
        Guard.Against.Null(services);
        Guard.Against.Null(optionsAction);
        return services
            .AddDbContext<Infrastructure.DocumentsContext>(optionsAction);
    }
}