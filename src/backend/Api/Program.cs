using Api;
using Api.Middleware;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("https://localhost:3000", "http://localhost:3000");
        });
});

// Add services to the container.
builder.Services
    .AddDatabase()
    .AddApplication();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure Db created
// TODO: Come back and fix this dirty hack
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<DocumentsContext>();

try
{
    await context.Database.MigrateAsync();
}
catch (Exception ex)
{
}

await context.Database.EnsureCreatedAsync();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000", "http://localhost:3000"));


app.MapControllers();

app.UseMiddleware<ValidationExceptionHandlingMiddleware>();

app.Run();
