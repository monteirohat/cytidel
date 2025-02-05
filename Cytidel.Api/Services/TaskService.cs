using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services.Interface;

namespace Cytidel.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }





    }
}
