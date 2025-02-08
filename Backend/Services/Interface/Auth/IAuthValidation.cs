using Cytidel.Api.Models.Auth;

namespace Cytidel.Api.Services.Interface
{
    public interface IAuthValidation
    {
       void Login(LoginModel model);
    }
}
