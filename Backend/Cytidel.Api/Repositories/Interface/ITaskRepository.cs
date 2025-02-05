using Cytidel.Api.Data.Entities;

namespace Cytidel.Api.Repositories.Interface
{
    public interface ITaskRepository
    {
        Task AddAsync(TaskEntity entity);
        Task<IEnumerable<TaskEntity>> GetAllAsync();
    }
}
