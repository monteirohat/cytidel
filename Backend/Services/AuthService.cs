using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using Cytidel.Api.Data.Entities;
using Cytidel.Api.Models.Auth;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Cytidel.Api.Services
{

    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthValidation _authValidation;
        private readonly IUserRepository _userRepository;
        public AuthService(IConfiguration configuration,
                    IAuthValidation authValidation,
                    IUserRepository userRepository)
        {
            _configuration = configuration;
            _authValidation = authValidation;
            _userRepository = userRepository;
        }

        public async Task<AuthModel> Login(LoginModel model)
        {
            _authValidation.Login(model);
            string message = "Email or password invalid.";

            var user = await _userRepository.GetByEmail(model.Email);
            if (user == null)
                throw new AuthenticationException(message);

            //Compare Hash
            var passwordHasher = new PasswordHasher<UserEntity>();
            var verificationResult = passwordHasher.VerifyHashedPassword(user, user.Password, model.Password);
            if (verificationResult != PasswordVerificationResult.Success)
                throw new AuthenticationException(message);

            var tokenString = GenerateToken(model.Email);
            var refreshToken = Guid.NewGuid().ToString();

            var authModel = new AuthModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Token = tokenString,
                RefreshToken = refreshToken
            };

            return authModel;
        }



        public async Task<AuthModel> RefreshToken(RefreshTokenModel model)
        {
            var user = await _userRepository.GetByIdAsync(model.Id);
            if (user == null)
                throw new AuthenticationException("User not found.");

            var tokenString = GenerateToken(user.Email);
            var refreshToken = Guid.NewGuid().ToString();
            var authModel = new AuthModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Token = tokenString,
                RefreshToken = refreshToken
            };

            return authModel;


        }


        private string GenerateToken(string email)
        {
            var claims = new[]
                       {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }

    }
}