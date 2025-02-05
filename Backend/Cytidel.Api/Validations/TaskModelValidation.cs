using Cytidel.Api.Models;

namespace Cytidel.Api.Validations
{
    public static class TaskModelValidation
    {
        public static void Validate(TaskCreateModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model), "Task model cannot be null.");
            }

            if (string.IsNullOrWhiteSpace(model.Title))
            {
                throw new ArgumentException("Title is required.", nameof(model.Title));
            }

            if (model.Title.Length > 255)
            {
                throw new ArgumentException("Title must not exceed 255 characters.", nameof(model.Title));
            }

            if (model.DueDate < DateTime.UtcNow)
            {
                throw new ArgumentException("Due date cannot be in the past.", nameof(model.DueDate));
            }
        }
    }
}
