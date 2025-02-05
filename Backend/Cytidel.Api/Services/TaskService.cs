using Cytidel.Api.Models;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services.Interface;
using Cytidel.Api.Mappers;
using Cytidel.Api.Validations;
using Cytidel.Api.Data.Entities.Enums;

namespace Cytidel.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly ILogger<TaskService> _logger;
        private readonly ITaskRepository _taskRepository;

        public TaskService(ILogger<TaskService> logger,
                        ITaskRepository taskRepository)
        {
            _logger = logger;
            _taskRepository = taskRepository;
        }


        public async Task<IEnumerable<TaskModel>> GetAll()
        {
            var entity = await _taskRepository.GetAllAsync();
            return entity.ToModel(); ;
        }



        public async Task<TaskModel> Create(TaskCreateModel model)
        {
            TaskModelValidation.Validate(model);

            var entity = model.ToEntity();
            await _taskRepository.AddAsync(entity);

            //Log hight priority
            if (model.IdPriority == (int)TaskPriorityEnum.High)
                _logger.LogCritical($"High priority task created: ID: {entity.Id} | Title: {model.Title} | Due Date: {model.DueDate}");


            return entity.ToModel();
        }

    }
}
