using Cytidel.Api.Models.Tasks;

namespace Cytidel.Api.Services.Interface
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskModel>> GetAll();
        Task<TaskModel> GetById(Guid id);
        Task<TaskModel> Create(TaskCreateModel model);
        Task<TaskModel> Update(TaskUpdateModel model);
        Task<TaskModel> ChangeStatus(Guid id, int idStatus);
        Task Delete(Guid id);
    }
}
