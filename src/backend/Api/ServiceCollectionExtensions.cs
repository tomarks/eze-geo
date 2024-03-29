using Api.Behaviors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services)
    {
        // Add Database Infrastructure
        return services.AddDatabase((_, dbContextOptionsBuilder) =>
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            var dbPath = Path.Join(path, "eze-geo-documents.db");

            dbContextOptionsBuilder.UseSqlite($"Data Source={dbPath}",
                x => x.MigrationsAssembly(typeof(Program).Assembly.FullName));
        });
    }

    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddCors();
        
        // Add Fluent Validation
        services.AddValidatorsFromAssembly(typeof(Program).Assembly);

        // Add Mediation
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(typeof(Program).Assembly);
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        return services;
    }
}
