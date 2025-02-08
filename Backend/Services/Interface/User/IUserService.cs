using Cytidel.Api.Models.User;

namespace Cytidel.Api.Services.Interface.User
{
    public interface IUserService
    {
       Task<IEnumerable<UserModel>> GetAll();
       Task<UserModel> GetById(Guid id);
       Task<UserModel> Create(UserCreateModel model);
       Task Delete(Guid id);
    }
}
