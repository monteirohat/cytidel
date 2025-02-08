using Cytidel.Api.Data.Entities.Enums;
using Cytidel.Api.Mappers;
using Cytidel.Api.Models.Tasks;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services.Interface;

namespace Cytidel.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly ILogger<TaskService> _logger;
        private readonly ITaskRepository _taskRepository;
        private readonly ITaskValidation _taskModelValidation;
         
        public TaskService(ILogger<TaskService> logger,
                        ITaskRepository taskRepository,
                        ITaskValidation taskModelValidation)
        {
            _logger = logger;
            _taskRepository = taskRepository;
            _taskModelValidation = taskModelValidation;
        }

        public async Task<IEnumerable<TaskModel>> GetAll()
        {
            var entity = await _taskRepository.GetAllAsync();
            return entity.ToModel(); ;
        }

        public async Task<TaskModel> GetById(Guid id)
        {
            var entity = await _taskRepository.GetByIdAsync(id);
            return entity.ToModel();
        }


        public async Task<TaskModel> Create(TaskCreateModel model)
        {
            _taskModelValidation.Create(model);

            var entity = model.ToEntity();
            await _taskRepository.AddAsync(entity);

            //Log hight priority
            LogHighPriorityTask(model.IdPriority, entity.Id, model.Title, model.DueDate);

            return entity.ToModel();
        }

        public async Task<TaskModel> Update(TaskUpdateModel model)
        {
            await _taskModelValidation.Update(model);

            var existingEntity = await _taskRepository.GetByIdAsync(model.Id);
            
            model.ToEntity(existingEntity);

            await _taskRepository.UpdateAsync(existingEntity);

            //Log hight priority
            LogHighPriorityTask(model.IdPriority, model.Id, model.Title, model.DueDate);

            return existingEntity.ToModel();
        }

        public async Task<TaskModel> ChangeStatus(Guid id, int idStatus)
        {
            await _taskModelValidation.Exists(id);

            await _taskRepository.DeleteByIdAsync(id);

            return null;
        }


        public async Task Delete(Guid id)
        {
            await _taskModelValidation.Exists(id);

            await _taskRepository.DeleteByIdAsync(id);
        }


        private void LogHighPriorityTask(int priority, Guid id, string title, DateTime dueDate)
        {
            if (priority == (int)TaskPriorityEnum.High)
            {
                string criticalMessage = $"High priority task created: ID: {0} | Title: {1} | Due Date: {2}";
                _logger.LogCritical(string.Format(criticalMessage, id, title, dueDate));
            }
        }


    }
}
