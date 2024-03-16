using Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add Database Infrastructure
builder.Services.AddDatabase((serviceProvider, builder) =>
{
    var folder = Environment.SpecialFolder.LocalApplicationData;
    var path = Environment.GetFolderPath(folder);
    var dbPath = Path.Join(path, "eze-geo-documents.db");

    builder.UseSqlite($"Data Source={dbPath}", x => x.MigrationsAssembly(typeof(Program).Assembly.FullName));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure Db created
// TODO: Come back and fix this dirty hack
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<DocumentsContext>();
await context.Database.EnsureCreatedAsync();
try
{
    await context.Database.MigrateAsync();
}
catch(Exception ex){}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();