using Cytidel.Api.Models.Auth;
using Cytidel.Api.Models.Tasks;

namespace Cytidel.Api.Services.Interface
{
    public interface IAuthService
    {
        Task<AuthModel> Login(LoginModel model);
        Task<AuthModel> RefreshToken(RefreshTokenModel model);
    }
}
