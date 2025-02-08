using Cytidel.Api.Data.Entities.Enums;
using Cytidel.Api.Models.Tasks;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services.Interface;
using Cytidel.Api.Utils;

namespace Cytidel.Api.Services.Validations
{
    public class TaskValidation : ITaskValidation
    {
        private readonly ITaskRepository _taskRepository;
        public TaskValidation(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public async Task Exists(Guid id)
        {
            if (id == Guid.Empty ||  ! await _taskRepository.ExistsAsync(id))
                throw new KeyNotFoundException("Task not found.");
        }


        private void CommonValidate(ITaskModel model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model), "Task model cannot be null.");

            if (string.IsNullOrWhiteSpace(model.Title))
                throw new ArgumentException("Title is required.", nameof(model.Title));

            if (model.Title.Length > 255)
                throw new ArgumentException("Title must not exceed 255 characters.", nameof(model.Title));

            if (model.DueDate < DateTime.UtcNow)
                throw new ArgumentException("Due date cannot be in the past.", nameof(model.DueDate));

            if (!model.IdPriority.IsValidEnum<TaskPriorityEnum>())
                throw new ArgumentException("IdPriority is invalid.", nameof(model.IdPriority));

            if (!model.IdStatus.IsValidEnum<TaskStatusEnum>())
                throw new ArgumentException("IdStatus is invalid.", nameof(model.IdStatus));

        }


        public void Create(TaskCreateModel model)
        {
            CommonValidate(model);
        }


        public async Task Update(TaskUpdateModel model)
        {
            await Exists(model.Id); 
            CommonValidate(model);
        }

       
    }
}
