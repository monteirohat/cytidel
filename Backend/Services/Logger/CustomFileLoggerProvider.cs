namespace Cytidel.Api.Services.Logger
{
    public class CustomFileLoggerProvider : ILoggerProvider
    {
        private readonly LogLevel _minLogLevel;
        private readonly string _filePath;

        public CustomFileLoggerProvider(string filePath, LogLevel minLogLevel)
        {
            _filePath = filePath ?? throw new ArgumentNullException(nameof(filePath));
            _minLogLevel = minLogLevel;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new CustomFileLogger(categoryName, _minLogLevel, _filePath);
        }

        public void Dispose()
        {
           
        }
    }
}
