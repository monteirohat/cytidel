using Cytidel.Api.Data.Entities;
using Cytidel.Api.Mappers;
using Cytidel.Api.Models.User;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services.Interface;
using Cytidel.Api.Services.Interface.User;

namespace Cytidel.Api.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;
        private readonly IUserValidation _userValidation;

        public UserService(
                        IUserRepository userRepository,
                        IUserValidation userValidation)
        {

            _userRepository = userRepository;
            _userValidation = userValidation;
        }

        public async Task<IEnumerable<UserModel>> GetAll()
        {
            var entity = await _userRepository.GetAllAsync();
            return entity.ToModel(); ;
        }

        public async Task<UserModel> GetById(Guid id)
        {
            var entity = await _userRepository.GetByIdAsync(id);
            return entity.ToModel();
        }

        public async Task<UserModel> Create(UserCreateModel model)
        {
            _userValidation.Create(model);

            model.Password = GeneratePasswordHash(model.Password);

            var entity = model.ToEntity();
            await _userRepository.AddAsync(entity);

            return entity.ToModel();
        }

        public async Task Delete(Guid id)
        {
            await _userValidation.Exists(id);

            await _userRepository.DeleteByIdAsync(id);
        }

        private string GeneratePasswordHash(string plainPassword)
        {
            var dummyUser = new UserEntity
            {
                Name = string.Empty,
                Email = string.Empty,
                Password = string.Empty
            };
            return PasswordHelper.GeneratePasswordHash<UserEntity>(plainPassword, dummyUser);
        }

    }
}
