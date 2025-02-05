using System.Text;

namespace Cytidel.Api.Services.Logger
{
    public class CustomFileLogger : ILogger
    {
        private readonly string _categoryName;
        private readonly LogLevel _minLogLevel;
        private readonly string _filePath;
        private static readonly object _lock = new object();

        public CustomFileLogger(string categoryName, LogLevel minLogLevel, string filePath)
        {
            _categoryName = categoryName;
            _minLogLevel = minLogLevel;
            _filePath = filePath;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return logLevel == _minLogLevel;
        }

        public void Log<TState>(LogLevel logLevel,
                                EventId eventId,
                                TState state,
                                Exception exception,
                                Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
                return;

            //Message
            var sb = new StringBuilder();
            sb.Append($"{DateTime.UtcNow:u} ");
            sb.Append($"[{logLevel}] ");
            sb.Append(formatter(state, exception));

            if (exception != null)
            {
                sb.AppendLine();
                sb.Append(exception);
            }

            var finalMessage = sb.ToString();

            lock (_lock) 
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_filePath));
                File.AppendAllText(_filePath, finalMessage + Environment.NewLine);
            }
        }
    }
}
