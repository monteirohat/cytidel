using Cytidel.Api.Data.Entities;

namespace Cytidel.Api.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<UserEntity> GetByEmail(string email);
        Task AddAsync(UserEntity entity);
        Task<IEnumerable<UserEntity>> GetAllAsync();
        Task<UserEntity> GetByIdAsync(Guid id);
        Task<bool> DeleteByIdAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);


    }
}
