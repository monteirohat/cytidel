using Cytidel.Api.Data.Entities;
using Cytidel.Api.Data.Entities.Enums;

namespace Cytidel.Api.Repositories.Interface
{
    public interface ITaskRepository
    {
        Task AddAsync(TaskEntity entity);
        Task UpdateAsync(TaskEntity entity);
        Task<IEnumerable<TaskEntity>> GetAllAsync();
        Task<TaskEntity> GetByIdAsync(Guid id);
        Task<bool> DeleteByIdAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
        Task<TaskEntity> ChangeStatus(Guid id, TaskStatusEnum status);
    }
}
