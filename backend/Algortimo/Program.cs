using Algoritimos.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<CardapioContext>(opt =>
    opt.UseInMemoryDatabase("CardapioList"));
builder.Services.AddDbContext<PratosContext>(opt =>
    opt.UseInMemoryDatabase("PratosList"));
builder.Services.AddDbContext<PratosInforContext>(opt =>
    opt.UseInMemoryDatabase("PratosInforList"));

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
