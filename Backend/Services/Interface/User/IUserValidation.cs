using Cytidel.Api.Models.User;

namespace Cytidel.Api.Services.Interface
{
    public interface IUserValidation
    {
        Task Exists(Guid id);
        void Create(UserCreateModel model);
    }
}
