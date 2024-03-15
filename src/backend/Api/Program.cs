using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add Database Infrastructure
builder.Services.AddInfrastructure((_, builder) =>
{
    var folder = Environment.SpecialFolder.LocalApplicationData;
    var path = Environment.GetFolderPath(folder);
    var dbPath = Path.Join(path, "documents.db");
    builder.UseSqlite($"Data Source={dbPath}");
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();



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
