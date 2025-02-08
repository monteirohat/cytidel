using Cytidel.Api.Data.Entities.Enums;
using Cytidel.Api.Models.Tasks;
using Cytidel.Api.Models.User;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services.Interface;
using Cytidel.Api.Utils;

namespace Cytidel.Api.Services.Validations
{
    public class UserValidation : IUserValidation
    {
        private readonly IUserRepository _userRepository;
        public UserValidation(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task Exists(Guid id)
        {
            if (id == Guid.Empty || !await _userRepository.ExistsAsync(id))
                throw new KeyNotFoundException("User not found.");
        }

        public void Create(UserCreateModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
                throw new ArgumentException("Name is required.", nameof(model.Name));

            if (string.IsNullOrWhiteSpace(model.Email))
                throw new ArgumentException("Email is required.", nameof(model.Email));

            if (string.IsNullOrWhiteSpace(model.Password))
                throw new ArgumentException("Password is required.", nameof(model.Password));

            if (model.Name.Length > 100)
                throw new ArgumentException("Name must not exceed 100 characters.", nameof(model.Name));

            if (model.Email.Length > 150)
                throw new ArgumentException("Email must not exceed 150 characters.", nameof(model.Email));
        }



    }
}
