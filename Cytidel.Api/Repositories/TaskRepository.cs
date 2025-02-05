using Cytidel.Api.Data;
using Cytidel.Api.Data.Entities;
using Cytidel.Api.Repositories.Interface;

namespace Cytidel.Api.Repositories
{
    public class TaskRepository : BaseRepository<TaskEntity>, ITaskRepository
    {
        public TaskRepository(CytidelContext context) : base(context)
        {
        }
    }
}
