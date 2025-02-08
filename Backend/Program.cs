using Cytidel.Api.Extensions;
using Cytidel.Api.Middleware;
using Cytidel.Api.Services.Logger;

var builder = WebApplication.CreateBuilder(args);

//logs
builder.Logging.ClearProviders();

builder.Logging.AddFilter("Microsoft", LogLevel.Warning);
builder.Logging.AddProvider(new CustomFileLoggerProvider("logs/requests.log", LogLevel.Information));
builder.Logging.AddProvider(new CustomFileLoggerProvider("logs/errors.log", LogLevel.Error));
builder.Logging.AddProvider(new CustomFileLoggerProvider("logs/critical.log", LogLevel.Critical));



builder.Services.AddInfraServices(builder.Configuration);

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

//Middlewares
app.UseMiddleware<RequestLoggingMiddleware>();
app.UseMiddleware<ExceptionHandlingMiddleware>();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
