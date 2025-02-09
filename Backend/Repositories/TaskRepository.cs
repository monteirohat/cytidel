using Cytidel.Api.Data;
using Cytidel.Api.Data.Entities;
using Cytidel.Api.Data.Entities.Enums;
using Cytidel.Api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Cytidel.Api.Repositories
{
    public class TaskRepository : BaseRepository<TaskEntity>, ITaskRepository
    {
        private readonly CytidelContext _dbContext;
        public TaskRepository(CytidelContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TaskEntity> ChangeStatus(Guid id, TaskStatusEnum status)
        {
            var task = await _dbContext.Tasks.FirstOrDefaultAsync(x=>x.Id == id);
            if (task == null)
                return null;

            task.Status = status;
            await _dbContext.SaveChangesAsync();

            return task;
        }
    }
}
