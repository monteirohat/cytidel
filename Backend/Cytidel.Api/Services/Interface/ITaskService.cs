using Cytidel.Api.Models;

namespace Cytidel.Api.Services.Interface
{
    public interface ITaskService
    {
        Task<TaskModel> Create(TaskCreateModel model);
        Task<IEnumerable<TaskModel>> GetAll();
    }
}
