namespace Cytidel.Api.Models.User
{
    public class UserModel
    {
         public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
      
    }
}
