using Cytidel.Api.Models.Tasks;

namespace Cytidel.Api.Services.Interface
{
    public interface ITaskValidation
    {
        Task Exists(Guid id);
        void Create(TaskCreateModel model);
        Task Update(TaskUpdateModel model);
    }
}
