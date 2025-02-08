namespace Cytidel.Api.Models.User
{
    public class UserCreateModel
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
         public required string Password { get; set; }
      
    }
}
