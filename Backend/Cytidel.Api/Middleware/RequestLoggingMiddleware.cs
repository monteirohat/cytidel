namespace Cytidel.Api.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;
       
        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }


        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                var method = context.Request?.Method;
                var endpoint = context.Request?.Path;

                _logger.LogInformation("Request: {Method} {Path}", method, endpoint);

                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in RequestLoggingMiddleware");
                throw; 
            }
        }
    }
}
