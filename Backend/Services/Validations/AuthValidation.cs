using System.Security.Authentication;
using Cytidel.Api.Models.Auth;
using Cytidel.Api.Services.Interface;

namespace Cytidel.Api.Services.Validations
{
    public class AuthValidation : IAuthValidation
    {


        public void Login(LoginModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
                throw new AuthenticationException();


        }



    }
}
