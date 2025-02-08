using Cytidel.Api.Data;
using Cytidel.Api.Data.Entities;
using Cytidel.Api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Cytidel.Api.Repositories
{
    public class UserRepository : BaseRepository<UserEntity>, IUserRepository
    {
        private readonly CytidelContext _dbContext;
        public UserRepository(CytidelContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserEntity> GetByEmail(string email)
        {
             return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
