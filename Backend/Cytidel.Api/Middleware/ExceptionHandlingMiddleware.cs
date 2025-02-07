using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Cytidel.Api.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "ArgumentNullException caught by middleware.");
                await HandleBadRequest(context, ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogError(ex, "ArgumentException caught by middleware.");
                await HandleBadRequest(context, ex.Message);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "ArgumentException caught by middleware.");
                await HandleBadRequest(context, ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception caught by middleware.");
                await HandleInternalServerError(context);
            }
        }

        private async Task HandleBadRequest(HttpContext context, string message)
        {
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            context.Response.ContentType = "application/json";

            var problem = new ProblemDetails
            {
                Status = (int)HttpStatusCode.BadRequest,
                Type = "https://httpstatuses.com/400",
                Title = "Bad request",
                Detail = message
            };

            // Escreve o objeto ProblemDetails como JSON
            await context.Response.WriteAsJsonAsync(problem);
        }

        private async Task HandleInternalServerError(HttpContext context)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var problem = new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Type = "https://httpstatuses.com/500",
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred."
            };

            await context.Response.WriteAsJsonAsync(problem);
        }
    }
}
