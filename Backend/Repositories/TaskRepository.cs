using Cytidel.Api.Data;
using Cytidel.Api.Data.Entities;
using Cytidel.Api.Repositories.Interface;

namespace Cytidel.Api.Repositories
{
    public class TaskRepository : BaseRepository<TaskEntity>, ITaskRepository
    {
        private readonly CytidelContext _dbContext;
        public TaskRepository(CytidelContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
